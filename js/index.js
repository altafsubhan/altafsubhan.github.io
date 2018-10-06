$(document).ready(() => {
    var w = window.innerWidth;
    setTimeout(() => {
        $('#scroll-down-pointer').css("visibility", "visible");
        $('#scroll-down-pointer').css("transform", "translateX(" + 0.36*(w) + "px)");
    }, 1500);

    $(window).scroll(() => {
        $("#navbar").css("display", "block");
        $('#scroll-down-pointer').css("visibility", "hidden");
    });

    var rows = $('.experienceRow');
    var modal = $('#mainModal');
    var span = $(".close")[0];

    for (var i = 0; i < rows.length; i++) {
        rows[i].addEventListener("click", (e) => {
            $("#navbar").css("display", "none");
            fillContent(e.target.parentElement.id);
            modal.css("display", "block");
        })
    }
    span.addEventListener("click", () => {
        modal.css("display", "none");
        $("#navbar").css("display", "block");
    });
    window.addEventListener("click", (e) => {
        if (e.target.id == "mainModal") {
            modal.css("display", "none");
            $("#navbar").css("display", "block");
        }
    });

    function fillContent(targetRow) {
        data = {
            sapRow: {
                id: 'sap-logo',
                src: 'resources/SAP-Logo.png',
                title: "Product Management Intern",
                company: "SAP Labs Waterloo",
                galleryImg: 'resources/sap-coops.JPG',
                content: '<p> \
                A major part of my job was spent researching and creating content for python \
                development in SAP HANA\'s microservices architecture (XSA). I published 8 \
                blogs covering REST API design for database access, web security including OAuth2, \
                speech-to-text and text-to-speech processing in web applications, and \
                geospatial analysis and visualization. All blogs are available at my \
                <a href="https://people.sap.com/altafsubhan">SAP Community Network</a> account. Each \
                blog was accompanied with a demo application, which I developed with little to no \
                previous documentation or tutorials.</p><p>\
                I was also featured in two live video chats, published on YouTube, where I discussed \
                my internship experience at SAP including the projects I worked on. The links to the \
                videos are as follows:\
                </p><ul>\
                <li><a href="https://goo.gl/mUPMqA">SAP CodeTalk - An Intern Working Within SAP HANA</a></li>\
                <li><a href="https://goo.gl/njnUPR">SAP CodeTalk - XSA Intern Catchup</a></li></ul>\
                <p>\
                I also participated in multiple customer and developer meetings where my supervisor and I \
                discussed feedback from customers for product improvements, synced with development teams \
                to ensure customer needs are being addressed as needed, and ensured projects are making \
                progress in the right direction. Some of my time was also spent in editing and testing\
                NodeJS and database artifact development courses (using Core Data Services) for SAP Global \
                TechEd 2018 conference.</p><p> \
                My <strong>manager\'s remarks</strong> about my work were as follows: (taken from \
                <a href="https://www.linkedin.com/in/altafsubhan">LinkedIn</a>)</p><p> \
                "I had the pleasure of managing Subhan as an intern during the summer of 2018 session \
                within the SAP HANA Product Management team. There are of course many talented young \
                students when it comes to technical capabilities. I would certainly count Subhan among \
                those with excellent programming and development skills.; however where he stands above \
                his peers is the combination of those technical skills with soft skills.</p><p> \
                Subhan proved himself quickly on the team by being a quick learner and being able to work \
                with little direct supervision. I was particularly impressed by the tenancy with which he \
                would attack new tasks. We asked him to research new topics in Python and SAP HANA XSA with \
                little help from others. Not only did he often have to work with little or no guidance or \
                documentation, but upon finding solutions on his own he was then responsible for writing \
                blogs to help fill those gaps.</p><p>\
                Finally I would comment on his communication skills, particularly his written communication. \
                Excellent developers and IT workers can separate themselves by having strong communication \
                skills. I believe that Subhan will excel in his future career because he has cultivated such \
                good communication skills. In this position he worked on several technical blogs and published \
                video interviews (SAP Code Talks). His work is published on the web for the world to see and \
                I would encourage any future employee to see the high quality of this work for themselves. I \
                think you will be as impressed as I was"</p><p> - Thomas Jung, Chief Product Expert, SAP HANA\
                </p>'
            },
            linamarRow: {
                id: 'linamar-logo',
                src: 'resources/linamar2.png',
                title: "Manufacturing Engineering Intern",
                company: "Linamar Corporation",
                galleryImg: 'resources/skyjack-coop.jpg',
                content: '<p>My work term was evenly split between software and mechanical projects.\
                </p><p><strong>Software:</strong></p><ul> \
                <li>Re-invented product documentation writing process, increasing efficiency by 50% \
                through automation scripts and enhanced search capabilities</li> \
                <li>Designed data model to store CAD information for auto-updating documents </li>\
                <li>Compiled tool library, analyzed images using pHash and Bing API</li>\
                <li>Developed scripts to improve file storage and access in SolidWorks PDM</li></ul> \
                </p><p><strong>Mechanical:</strong></p><ul> \
                <li>Conducted PFMEAs; led implementation of 3 poka-yokes to prevent manufacturing \
                delays</li><li>\
                3D Designed storage carts, focusing on optimized space use and reduced part damage</li> \
                <li>Created Process Flows and Work Instructions for manufacturing process of SJ 3215 \
                (scissor lifts)</li></ul>'
            },
            gmRow: {
                id: 'gm-logo',
                src: 'resources/gm.png',
                title: "Innovation Specialist",
                company: "General Motors of Canada",
                galleryVid: 'resources/gm-vid.mp4',
                content: '<p>As an Innovation Specialist at GM 2908 Innovation Lab, I \
                formed the liaison between customers and the big corporation. My job \
                was to follow <b>lean development</b> principles to gather real-time \
                customer feedback on future automotive products. I worked with customers \
                to validate our problem statements, explore customer needs and influences, \
                and develop prototypes that address those needs with a focus on usability \
                and functionality. Working on a variety of projects allowed me useful \
                insights into the current market needs especially the <b>urban mobility \
                problems</b> and the need for <b>sustainable, green alternatives</b> . I \
                also gained experience with driving forward development projects with \
                a customer-centric approach.</p><p> \
                Throughout my time at GM, I worked on three major projects. For the first \
                one, I developed an infotainment software prototype to study how user-adaptive \
                features could be implemented with cloud technology integration. My second \
                project entailed developing a physical prototype using Arduino connected \
                over Bluetooth with an Android application. This prototype was used to gain \
                insight into customer refuelling and recharging habits and use that to drive \
                a development project. The last project was related to electric bikes. I was \
                responsible for developing a Virtual Reality experience that allowed us to \
                test products with customers before any physical development.</p><p>\
                Another major part of my job was to facilitate design-thinking workshops. \
                These workshops entailed interviewing customers to empathize and gain \
                insight into pain points, leading ideation sessions to explicitly define the \
                problem and work towards a combined solution.</p>'
            },
            llcRow: {
                id: 'llc-logo',
                src: 'resources/uw_llc.jpg',
                title: "Engineering Co-op Peer Leader",
                company: "University of Waterloo Living-Learning Community",
                galleryImg: 'resources/llc-group.jpg',
                content: '<h3 style="text-align: center">Details coming soon. Stay tuned!</h3>'
            },
            watoRow: {
                id: 'wato-logo',
                src: 'resources/wato.png',
                title: "Power Systems Sub-Team Lead",
                company: "WATonomous Student Design Team",
                galleryImg: 'resources/wato.png',
                content: '<h3 style="text-align: center">Details coming soon. Stay tuned!</h3>'
            },
            uwaftRow: {
                id: 'uwaft-logo',
                src: 'resources/uwaft_logo.png',
                title: "Designer and Machinist",
                company: "University of Waterloo Alternative Fuels Team",
                galleryImg: 'resources/uwaft_logo.png',
                content: '<h3 style="text-align: center">Details coming soon. Stay tuned!</h3>'
            },
            kumonRow: {
                id: 'kumon-logo',
                src: 'resources/kumon-bm-logo.png',
                title: "Math and Reading Tutor",
                company: "Kumon",
                galleryImg: 'resources/kumon-bm-logo.png',
                content: '<h3 style="text-align: center">Details coming soon. Stay tuned!</h3>'
            }
        }
        $('.modalLogo').children()[0].id = data[targetRow].id;
        $('.modalLogo').children()[0].src = data[targetRow].src;
        $('.modalTitle').text(data[targetRow].title);
        $('.modalCompany').text(data[targetRow].company);
        if (data[targetRow].galleryVid == undefined) 
            $('.gallery').html('<img src="' + data[targetRow].galleryImg + '">');
        else
            $('.gallery').html('<video controls><source src="'
                + data[targetRow].galleryVid + '" type="video/mp4"></video>');
        $('.gallery').css("display", "block");
        $('.contentHTML').html(data[targetRow].content);
        $('.contentHTML').css("display", "block");
    }

    $('#tango').hover(function() {
        $("#tangoAward").css("display", "block");
    }, function() {
        $("#tangoAward").css("display", "none");
    });

    $('#anxietyBot').hover(function() {
        $("#anxietyBotAward").css("display", "block");
    }, function() {
        $("#anxietyBotAward").css("display", "none");
    });

    $('#blokit').hover(function() {
        $("#blokitAward").css("display", "block");
    }, function() {
        $("#blokitAward").css("display", "none");
    });

    $('#trussBridge').hover(function() {
        $("#trussAward").css("display", "block");
    }, function() {
        $("#trussAward").css("display", "none");
    });

    var projects = $('.project');
    var projectModal = $('#projectModal');
    var projectSpan = $(".projectClose")[0];

    for (var i = 0; i < projects.length; i++) {
        projects[i].addEventListener("click", (e) => {
            $("#navbar").css("display", "none");
            showProject(e.target.parentElement.id);
            projectModal.css("display", "block");
        })
    }
    projectSpan.addEventListener("click", () => {
        projectModal.css("display", "none");
        $("#navbar").css("display", "block");
    });
    window.addEventListener("click", (e) => {
        if (e.target.id == "projectModal") {
            projectModal.css("display", "none");
            $("#navbar").css("display", "block");
        }
    });

    function showProject(project){
        data = {
            coinCashier : {
                title: 'Automated Coin Cashier',
                img: 'resources/coinRobot.jpg',
                content: '<p>A robot that takes as input the transaction amount \
                    along with coins. It counts the worth of the coins provided, sorts \
                    those coins, and stores them. Then, it subtracts the transaction \
                    amount from the provided cash and returns to the user the difference \
                    (as coins).</p><h3 style="text-align:center">More details coming soon. \
                    Stay tuned!</h3>'
            },
            statsProject : {
                title: 'Distance Measurer',
                img: 'resources/distance_measurer.jpg',
                content: '<p>A device, designed using laser-cut plastic parts, a Raspberry \
                    Pi board, and a 3-axis accelerometer, that allows users to measurer \
                    a length between 0 to 30 centimeters.</p><h3 style="text-align:center">More \
                    details coming soon. Stay tuned!</h3>'
            },
            trussBridge : {
                title: 'Optimum Truss Bridge Design',
                vid: 'https://www.youtube.com/embed/2w7vi11hMVU',
                content: '<p>A truss bridge made out of balsa wood that can hold a load that is \
                    700 times more than its mass. This bridge ranked 3rd in the whole class of 100 \
                    Mechatronics Engineering students (~33 groups).</p><h3 style="text-align:center">\
                    More details coming soon. Stay tuned!</h3>'
            },
            attendanceAid : {
                title: 'Attendance Scheduler Application',
                vid: 'https://www.youtube.com/embed/91gpT8EGzks',
                content: '<p>A Java application that allows users to automatically create timetables \
                    for supply teachers covering for teachers that are away. It can pull information \
                    from an Excel spreadsheet regarding both types of teachers and find best matches. \
                    </p><h3 style="text-align:center">More details coming soon. Stay tuned!</h3>' 
            }
        }
        $('.projectModalTitle').text(data[project].title);
        if (data[project].vid == undefined) 
            $('.projectGallery').html('<img src="' + data[project].img + '">');
        else
            $('.projectGallery').html('<iframe height="50%" src="' + data[project].vid +
                '" frameborder="0" allow="autoplay; encrypted-media" allowfullscreen></iframe>');
        $('.projectGallery').css("display", "block");
        $('.projectContentHTML').html(data[project].content);
        $('.projectContentHTML').css("display", "block");
    }
});