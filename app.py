from flask import Flask, render_template, request, redirect, jsonify
from sqlalchemy import create_engine
from sqlalchemy.orm import scoped_session, sessionmaker
from datetime import date
import os


engine = create_engine("postgres://rumvuoekqeumco:cc21e88da6b3f796f25dcff8ec377ec2f832b05103735f0f45197ea7d656e495@ec2-3-208-224-152.compute-1.amazonaws.com:5432/d42ljngj20hedd")
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
    user = db.execute("SELECT * FROM users where user_id = :user_id", {"user_id": discordcode}).fetchone()
    if(user):
        return render_template("dashboard.html", discordcode=user)
    return "hola mundo cruel"

@app.route('/dashboard/getuserhabit/<string:discordcode>', methods=['GET'])
def getUserHabits(discordcode):
    user = db.execute(getQuery("habitsByMonth"), 
    {"user_id": discordcode, 
    "firstdayyear": f"{date.today().year}-01-01",  
    "lastdayyear": f"{date.today().year}-12-31"}).fetchall()
    return jsonify({"data": [dict(row) for row in user]})

@app.route('/dashboard/getdayhabit/<string:discordcode>', methods=['GET'])
def getDayHabits(discordcode):
    user = db.execute(getQuery("habitsByDays"), 
    {"user_id": discordcode, "createdAt": date.today().strftime("%Y-%m-%d")}).fetchall()
    return jsonify({"data": [dict(row) for row in user]})
   
def getQuery(filename):
    SRCDIR = os.path.dirname(os.path.abspath(__file__))
    DATADIR = os.path.join(SRCDIR, 'sqlscripts')
    scriptname = os.path.join(DATADIR, filename+'.sql')
    usersScript = open(scriptname).read()
    return usersScript