const moduleModel = require("../models/module.model");
const DanceClass = moduleModel.getDanceClassModel();
const Student = moduleModel.getStudentModel();
const {google} = require('googleapis');
const fs = require('fs');
const readline = require('readline');
var qr = require('qr-image');

const SCOPES = ["https://mail.google.com/",
"https://www.googleapis.com/auth/gmail.modify",
"https://www.googleapis.com/auth/gmail.compose",
"https://www.googleapis.com/auth/gmail.send"];
const TOKEN_PATH = 'token.json';

function authorize(credentials, callback) {
  const {client_secret, client_id, redirect_uris} = credentials.installed;
  const oAuth2Client = new google.auth.OAuth2(
      client_id, client_secret, redirect_uris[0]);

  // Check if we have previously stored a token.
  fs.readFile(TOKEN_PATH, (err, token) => {
    if (err) return getNewToken(oAuth2Client, callback);
    oAuth2Client.setCredentials(JSON.parse(token));
    callback(oAuth2Client);
  });
}

function getNewToken(oAuth2Client, callback) {
  const authUrl = oAuth2Client.generateAuthUrl({
    access_type: 'offline',
    scope: SCOPES,
  });
  console.log('Authorize this app by visiting this url:', authUrl);
  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
  });
  rl.question('Enter the code from that page here: ', (code) => {
    rl.close();
    oAuth2Client.getToken(code, (err, token) => {
      if (err) return console.error('Error retrieving access token', err);
      oAuth2Client.setCredentials(token);
      // Store the token to disk for later program executions
      fs.writeFile(TOKEN_PATH, JSON.stringify(token), (err) => {
        if (err) return console.error(err);
        console.log('Token stored to', TOKEN_PATH);
      });
      callback(oAuth2Client);
    });
  });
}
exports.send = (req,res)=>{
    if(req.params && req.body){
        if(req.params.id && req.params.id != "undefined" && req.body.length > 0){
            DanceClass.findOne({_id:req.params.id}, function(errDanceClass, danceClass) {
                if(errDanceClass){
                    res.status(500).json();
                }else{
                    const students = danceClass.students.filter(x=>req.body.find(y=>y == x._id));
                    fs.readFile('oauthkey.json', (err, content) => {
                        if (err) return console.log('Error loading client secret file:', err);
                        // Authorize a client with credentials, then call the Gmail API.
                        authorize(JSON.parse(content), (auth)=>{

                            const gmail = google.gmail({version: 'v1', auth});
                            let resultEmail = [];
                            students.forEach(student=>{
                                var qr_svg = qr.image(student._id.toString(), { type: 'svg' });
                                qr_svg.pipe(require('fs').createWriteStream('check.svg'));
                                 
                                var svg_string = qr.imageSync(student._id.toString(), { type: 'svg' });
                                const email = "From: maiconpintoabreu@gmail.com\r\n" +
                                "To: "+student.email+"\r\n" +
                                "Subject: Ticket for "+danceClass.name+"\r\n" +
                                "Content-Type: text/html; charset=UTF-8\r\n"+
                                
                                "Hello "+student.name+",\r\nShow this ticket on the event\r\n\r\n" +
                                "<img src='"+encodeURIComponent(svg_string)+"' alt='ticket' />";
                                var base64EncodedEmail = Buffer.from(email).toString('base64');
                                var request = gmail.users.messages.send({
                                'userId': "me",
                                'resource': {
                                    'raw': base64EncodedEmail
                                }
                                },(errEmail)=>{
                                    if(!errEmail){
                                        resultEmail.push({email:student.email,success:true});
                                        if(resultEmail.length == students.length)
                                            res.status(200).json(resultEmail);
                                    }else{
                                        resultEmail.push({email:student.email,success:false});
                                        console.error("errEmail",errEmail);
                                        if(resultEmail.length == students.length)
                                            res.status(200).json(resultEmail);
                                    }
                                });
                            })
                        });
                    }); 
                }
            }).populate("students");
        }else{
            res.status(500).json("Error");
        }
    }else{
        res.status(500).json("Error");
    }
};