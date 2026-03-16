import fs from 'fs';

const path = 'content.json';
const content = JSON.parse(fs.readFileSync(path, 'utf8'));

content.footer = {
    "logo": "/assets/Runnerlogo.png",
    "tagline": "FAST PACED ENDLESS RUNNING ACROSS EVER CHANGING WORLDS. RUN, DODGE, COMPETE AND PUSH YOUR LIMITS.",
    "socials": [
        { "platform": "facebook", "url": "#" },
        { "platform": "twitter", "url": "#" },
        { "platform": "instagram", "url": "#" },
        { "platform": "youtube", "url": "#" }
    ],
    "contactEmail": "SUPPORT@PLAYSPHERESTUDIOS.COM",
    "copy": "© 2026 RUNNER RUNNER. ALL RIGHTS RESERVED."
};

content.newsletter = {
    "title": "DAILY INTEL DROP",
    "subtitle": "GET THE LATEST BLOG & NEWS DELIVERED STRAIGHT TO YOUR INBOX."
};

content.testimonialsPage = {
    "hero": {
        "title": "WHAT OUR <span>RUNNERS</span> ARE SAYING",
        "subtitle": "THOUSANDS OF PLAYERS ARE DASHING THROUGH THE CITY. HERE IS WHY THEY CANNOT STOP RUNNING."
    },
    "stats": [
        {
            "icon": "/assets/Testimonial/11.png",
            "value": "2M+",
            "title": "GAMES PLAYED",
            "desc": "RUNS COMPLETED BY PLAYERS AROUND THE WORLD"
        },
        {
            "icon": "/assets/Testimonial/12.png",
            "value": "370K+",
            "title": "INSTALLS",
            "subtitle": "RUNNERS WHO HAVE JOINED THE",
            "desc": "RUNNER RUNNER"
        },
        {
            "icon": "/assets/Testimonial/13.png",
            "value": "$75K+",
            "title": "PRIZES DISTRIBUTED",
            "desc": "REAL REWARDS EARNED THROUGH SPECIAL EVENTS"
        },
        {
            "icon": "/assets/Testimonial/14.png",
            "value": "3K+",
            "title": "GAMES DAILY",
            "desc": "THE RUN NEVER STOPS"
        }
    ],
    "shareStory": {
        "title": "SHARE YOUR <span class=\"highlight\">STORY</span>",
        "subtitle": "GOT AN EPIC RUN? TELL US ABOUT IT AND YOU MIGHT BE FEATURED ON THIS PAGE!"
    }
};

content.powerplayPageAssets = {
    "hero": {
        "bg": "/assets/powerplay assets/herobg.png",
        "assets": [
            "/assets/powerplay assets/1.png",
            "/assets/powerplay assets/2.png",
            "/assets/powerplay assets/3.png",
            "/assets/powerplay assets/4.png"
        ],
        "runBtn": "/assets/powerplay assets/BTN 1.png"
    }
};

fs.writeFileSync(path, JSON.stringify(content, null, 2));
console.log('content.json updated successfully');
