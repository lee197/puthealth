var language = window.localStorage.getItem("language");
if (language && language === "en") {
    enSelect();
} else {
    cnSelect();
}


$(".language-cn").on("click", function () {
    cnSelect();
});

$(".language-en").on("click", function () {
    enSelect();
});


function cnSelect () {
    $(".language-cn").css("color", "#239b3a")
    $(".language-en").css("color", "rgba(0, 0, 0, 0.6)")
    getlanguageJson("./language/index_cn.json", translateIndexPages);
    window.localStorage.setItem("language", "cn");
}
function enSelect () {
    $(".language-en").css("color", "#239b3a")
    $(".language-cn").css("color", "rgba(0, 0, 0, 0.6)")
    getlanguageJson("./language/index_en.json", translateIndexPages);
    window.localStorage.setItem("language", "en")
}

function getlanguageJson (url, translatePages) {
    $.ajax({
        type: "GET",
        url: url,
        dataType: "json",
        async: false,
        success: function (data) {
            translatePages(data);
        }
    })
}

function translateIndexPages (data) {
    if (data) {
        // #### nav
        $(".site-menu li a").each(function (index) {
            $(this).text(data.nav[index])
        });

        // #### banner 4个
        for (let i = 0; i < 4; i++) {
            if (i !== 1) {
                $(".puthealthbanner" + (i + 1) + " h2").text(data.banner[i]);
            } else {
                // 特殊处理的banner
                $(".puthealthbanner2 .puthealthbanner2-box").each(function (index) {
                    $(this).css("writing-mode", data.banner[1][4]);
                });
                for (let j = 0; j < 4; j++) {
                    $(".puthealthbanner2 .desc" + (j + 1)).text(data.banner[1][j]);
                }

            }
        }

        // #### about 
        $("#about .title span").text(data.about.title[0]);
        $("#about .title h2").text(data.about.title[1]);
        $("#about p").each(function (index) {
            $(this).text(data.about.content[index])
        });

        // #### products
        $("#product .title span").text(data.products.title[0]);
        $("#product .title h2").text(data.products.title[1]);
        // 3个产品
        for (let i = 0; i < 3; i++) {
            $("#product .media-image-body" + (i + 1) + " h2").text(data.products["product-" + (i + 1)].title);
            $("#product .media-image-body" + (i + 1) + " p").text(data.products["product-" + (i + 1)].content);
        }

        // #### news
        $("#knowledge #service span").text(data.news.title[0]);
        $("#knowledge #service h2").text(data.news.title[1]);
        // latast
        $("#knowledge .headlines-content h2 a").text(data.news.latast.title);
        $("#knowledge .headlines-content-summary .qhd-content p").text(data.news.latast.infor);
        // 3个新闻
        for (let i = 0; i < 3; i++) {
            $("#knowledge .time .time-day").text(data.news.list[i][0]);
            $("#knowledge .time .time-date").text(data.news.list[i][1]);
            $("#knowledge .entry-title a").text(data.news.list[i][2]);
            $("#knowledge .entry-summary .qhd-content p").text(data.news.list[i][3]);
        }

        // #### contact
        $("#contact .title h2").text(data.connect.title[0]);
        for (let i = 0; i < 6; i++) {
            $("#contact .form" + (i + 1) + " .contact-label").html(data.connect.form[i][0]);
            $("#contact .form" + (i + 1) + " .form-control").attr("placeholder", data.connect.form[i][1]);
        }
        // subumit
        $("#contact .contact-subumit").val(data.connect.subumit);
        // address
        $("#contact .contact-addressinfor h3").text(data.connect.adress.title);
        $("#contact .contact-addressinfor p").each(function (index) {
            $(this).text(data.connect.adress.content[index])
        });
    } else {
        console.error('error;', "index翻译配置文件未获取到...")
    }



}

function translateProductsPages (data) {
    if (data) {
        // banner 
        $(".product-banner h1").text(data.banner.title);
        $(".product-banner span").text(data.banner.vender);
        // 产品简介
        $(".chapter").text(data.chapter);
        $(".chapter-character li").each(function (index) {
            $(this).text(data["chapter-character"][index])
        })
        $(".chapter-desc p").each(function (index) {
            $(this).text(data["chapter-desc"][index])
        })
        // 使用说明
        $(".product-instructions p").each(function (index) {
            $(this).text(data["product-instructions"][index])
        })
    } else {
        console.error('error;', "products翻译配置文件未获取到...")
    }
}