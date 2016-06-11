/**
 * Created by dong on 16/6/11.
 */
$(function () {
    var ul = $('.slide ul');
    var ulLi = $('.slide ul li');
    var ulOl = $('.slide ol li');
    $('.slide ul li:first').clone().appendTo(ul); //复制第一个li

    var left = 0;
    var t = 0;
    var index = 0;
    var len = ulLi.length; //图片li的数量
    var liW = ulLi.width(); //获取图片li 宽度
    var ulW = liW * len; //ul的宽度
    ul.width(ulW);//设置ul的宽度

    console.log('len=' + len);
    console.log('liw=' + liW);
    console.log('ulw=' + ulW);
    function moving() {
        left = index * liW;
        if (index >= len - 1) {
            ul.stop().animate({'left': -left}, 500, function () {
                index = 0;
                ul.css('left', 0);
                ulOl.eq(index).addClass('on').siblings().removeClass('on');
            });
        }
        else {
            ul.stop().animate({'left': -left}, 500);
            ulOl.eq(index).addClass('on').siblings().removeClass('on');
        }
        console.log(index);
    }

//下一图按钮
    $('.slide .next').click(function () {
        index++;
        if (index > len) {
            index = 1;
            ul.css('left', 0).stop().animate({'left': -index * liW}, 500);
        }
        else {
            moving();
        }
        ulOl.eq(index).addClass('on').siblings().removeClass('on');
    });
//上一图按钮
    $('.slide .prev').click(function () {
        index--;
        if (index < 1) {
            if (index < 0) {
                index = len - 2;
                ul.css('left', -(len - 1) * liW).stop().animate({'left': -(len - 2) * liW}, 500);
            } else {
                left = index * liW;
                ul.stop().animate({'left': -left}, 500, function () {
                    index = len - 1;
                    ul.css('left', -index * liW);
                });
            }
            ulOl.eq(index).addClass('on').siblings().removeClass('on');
        } else {
            moving();
        }


    });
//自动轮播
    function automatic() {
        index++;
        moving();
    }

    $('.slide').hover(function () {
        clearInterval(t);
    }, function () {
        t = setInterval(automatic, 31000);
    }).trigger('mouseleave');

});