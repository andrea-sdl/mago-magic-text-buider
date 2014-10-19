/**
 * Created by andrea on 15/10/2014.
 */

/**
 * are you really spying this code? Come'on! It's easy, trust me.
 * No real magic here (you didn't really believe there were magic tricks involved, right?)
 *
 * But, hey, you shouldn't really spy on a magician's trick, even though it's fake.
 *
 *
 *
 *
 * ok, I suppose you deserve to read. Hope you enjoy my friend.
 */
function doTheMagicMove(){
    var input=$("#input-text").html();
    var source=$("#template-text").html();

    var template = Handlebars.compile(source);

    var lines = input.split("\n");
    var row;
    var fullHtml="";
    for (var lineNum in lines)
    {
        row={};
        var line = lines[lineNum];
        var columnData=line.split(getSplitChar());
        for (var colNum in columnData ){
            var colName="data";
            if (colNum>0)
            {
                colName= colName+(colNum-0+1-0);
            }
            row[colName]=columnData[colNum];
        }
        var singleHtml=template(row);
        if (lineNum==0)
            fullHtml=singleHtml;
        else
            fullHtml=fullHtml+"\n"+singleHtml;
    }
    $("#result-text").html(fullHtml);
    $('html, body').animate({
        scrollTop: $("#result-text").offset().top-150
    }, 1000);
    $("#result-text").focus();

}
function getSplitChar(){
    if ($("#csv-mode").attr("checked")=='checked')
        return ";"
    else
        return "\t";
}

function setMAGOData(input,template){
    $("#input-text").html(input);
    $("#template-text").html(template);
}
function enableCSV(){
    $("#csv-mode").attr("checked",true);
    $("#magicMoveBtn").removeClass("btn-warning").addClass("btn-primary");
    $("#csv-mode-enabled").removeClass("hidden");

    $("#csv-mode-disabled").addClass("hidden");
}

function disableCSV(){
    $("#csv-mode").attr("checked",false);
    $("#magicMoveBtn").removeClass("btn-primary").addClass("btn-warning");
    $("#csv-mode-enabled").addClass("hidden");
    $("#csv-mode-disabled").removeClass("hidden");
}
$(document).ready(function(){
    if (document.location.href.indexOf("clear=true")>0){
        setMAGOData("","");
    }
    if (document.location.href.indexOf("csv=true")>0){
        enableCSV();
    }
});

function demoCSV(){
    enableCSV();
    var input="Austria;Vienna\nItaly;Rome\nUSA;New York";
    var template="The capital of {{data}} is {{data2}}";

    setMAGOData(input,template);

    $('html, body').animate({
        scrollTop: $("#input-text").offset().top-150
    }, 1000);
}

function demoExcel(){
    disableCSV();
    var input="Andrea	Grassi\nJon	Ive\nBill	Gates";
    var template="UPDATE contacts WHERE \nname='{{data}}' AND \nsurname='{{data2}}' AND \nsurname not in \n   (select bannedSurname from banned where surname='{{data2}}');";

    setMAGOData(input,template);

    $('html, body').animate({
        scrollTop: $("#input-text").offset().top-150
    }, 1000);
}
