$(document).ready(() => {
    var w = window.innerWidth;
    setTimeout(() => {
        $('#scroll-down-pointer').css("visibility", "visible");
        $('#scroll-down-pointer').css("transform", "translateX(" + 0.36*(w) + "px)");
    }, 1000);

    $(window).scroll(() => {
        $("#navbar").css("display", "block");
        $('#scroll-down-pointer').css("visibility", "hidden");
    });

    var rows = $('.experienceRow');
    var modal = $('#mainModal');
    var span = $(".close")[0];

    for (var i = 0; i < rows.length; i++) {
        rows[i].addEventListener("click", (e) => {
            fillContent(e.target.parentElement.id);
            modal.css("display", "block");
        })
    }
    span.addEventListener("click", () => {
        modal.css("display", "none");
    });
    window.addEventListener("click", (e) => {
        if (e.target.id == "mainModal") {
            modal.css("display", "none");
        }
    });

    function fillContent(targetRow) {
        //alert(targetRow);
        data = {
            sapRow: {
                id: 'sap-logo',
                src: 'resources/SAP-Logo.png',
                title: "Product Management Intern",
                company: "SAP Labs Waterloo"
            },
            linamarRow: {
                id: 'linamar-logo',
                src: 'resources/linamar2.png',
                title: "Manufacturing Engineering Intern",
                company: "Linamar Corporation"
            },
            gmRow: {
                id: 'gm-logo',
                src: 'resources/gm.png',
                title: "Innovation Specialist",
                company: "General Motors"
            },
            llcRow: {
                id: 'llc-logo',
                src: 'resources/uw_llc.jpg',
                title: "Engineering Co-op Peer Leader",
                company: "University of Waterloo Living-Learning Community"
            },
            uwaftRow: {
                id: 'uwaft-logo',
                src: 'resources/uwaft_logo.png',
                title: "Designer and Machinist",
                company: "University of Waterloo Alternative Fuels Team"
            },
            kumonRow: {
                id: 'kumon-logo',
                src: 'resources/kumon-bm-logo.png',
                title: "Math and Reading Tutor",
                company: "Kumon"
            }
        }
        $('.modalLogo').children()[0].id = data[targetRow].id;
        $('.modalLogo').children()[0].src = data[targetRow].src;
        $('.modalTitle').text(data[targetRow].title);
        $('.modalCompany').text(data[targetRow].company);
    }
});
