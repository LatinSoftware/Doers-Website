from flask import Flask, render_template, request, redirect, jsonify
from sqlalchemy import create_engine
from sqlalchemy.orm import scoped_session, sessionmaker
from datetime import date
import os

DATABASE_URL = os.environ.get("DB_URL")
if not DATABASE_URL:
    raise ValueError("No DATABASE_URL set for Flask application")
engine = create_engine(DATABASE_URL)
db = scoped_session(sessionmaker(bind=engine))
app = Flask(__name__)

@app.route('/')
def index():
    SRCDIR = os.path.dirname(os.path.abspath(__file__))
    DATADIR = os.path.join(SRCDIR, 'sqlscripts')
    scriptname = os.path.join(DATADIR, 'users.sql')
    usersScript = open(scriptname).read()
    users = db.execute(usersScript).fetchall()
    return render_template("index.html", users=users)

@app.route('/dashboard/<string:discordcode>')
def userDashboard(discordcode):
    user = db.execute('SELECT id, name, "discordId", strikes, birthday, active, "createdAt", "updatedAt" FROM public."Users" WHERE "discordId" = :user_id', 
    {"user_id": discordcode}).fetchone()
    if(user):
        return render_template("dashboard.html", discordcode=user)
    return "hola mundo cruel"

@app.route('/dashboard/gethabits', methods=['GET'])
def getUserHabits():
    data = db.execute(getQuery('habitsByDates'), {
        "discord_id": request.args.get('discordcode'),
        "datefrom": request.args.get('datefrom'),
        "dateto": request.args.get('dateto')
    })
    return jsonify({"data": [dict(row) for row in data]})

@app.route('/dashboard/getdayhabit/<string:discordcode>', methods=['GET'])
def getDayHabits(discordcode):
    user = db.execute(getQuery("habitsByDays"), 
    {"discord_id": discordcode}).fetchall()
    return jsonify({"data": [dict(row) for row in user]})
   
def getQuery(filename):
    SRCDIR = os.path.dirname(os.path.abspath(__file__))
    DATADIR = os.path.join(SRCDIR, 'sqlscripts')
    scriptname = os.path.join(DATADIR, filename+'.sql')
    usersScript = open(scriptname).read()
    return usersScript

@app.teardown_appcontext
def shutdown_session(exception=None):
    db.close()

if __name__ == '__main__':
    app.run(threaded=True, port=5000)