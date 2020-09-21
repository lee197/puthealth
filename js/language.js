$(".language-cn").on("click", function () {
    // 替换 button 的 content
    $('#btnGroupDrop1').html("🇨🇳 中文");
    getlanguageJson("./language/cn.json", translatePages);
});

$(".language-en").on("click", function () {
    // 替换 button 的 content
    $('#btnGroupDrop1').html("🇬🇧 Enlish");
    getlanguageJson("./language/en.json", translatePages);

});


function getlanguageJson (url, translatePages) {
    $.ajax({
        type: "GET",
        url: url,
        dataType: "json",
        async: false,
        success: function (data) {
            translatePages(data)
        }
    })
}

function translatePages (data) {
    if (data) {
        console.log(' data ', data['banner']);

        // nav
        $(".site-menu li a").each(function (index) {
            $(this).text(data.nav[index])
        });

        // banner 4个
        for (let i = 0; i < 4; i++) {
            $(".puthealthbanner" + (i + 1) + " h2").text(data.banner[i]);
        }

        // about 
        $("#about .title span").text(data.about.title[0]);
        $("#about .title h2").text(data.about.title[1]);
        $("#about p").each(function (index) {
            $(this).text(data.about.content[index])
        });

        // products
        $("#product .title span").text(data.products.title[0]);
        $("#product .title h2").text(data.products.title[1]);
        // 3个产品
        for (let i = 0; i < 3; i++) {
            $("#product .media-image-body" + (i + 1) + " h2").text(data.products["product-" + (i + 1)].title);
            $("#product .media-image-body" + (i + 1) + " p").text(data.products["product-" + (i + 1)].content);
        }

        // news
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

        // contact
        $("#contact .title h2").text(data.connect.title[0]);
        // for (let i = 0; i < 6; i++) {
        //     $("#contact .from" + (i + 1) + " .font-weight-bold").text(data.connect.form[i][0]);
        //     $("#contact .from" + (i + 1) + " .form-control").attr("placeholder", data.connect.form[i][1]);
        // }
        // $("#contact .from1 .contact-label").html(data.connect.form[0][0]);
        // $("#contact .from1 .form-control").attr("placeholder", data.connect.form[0][1]);

        $("#contact .contact-subumit").val(data.connect.subumit);
        // $("#contact .contact-infor h3").text("hhh");
        // $("#contact .contact-infor p").each(function (index) {
        //     console.log('object', index)
        //     // $(this).text(data.connect.adress.content[index])
        // });
    }



}
