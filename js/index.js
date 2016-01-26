
// https://en.wikipedia.org/w/api.php?action=opensearch&search=api&limit=10&namespace=0&format=json
var apiEndpointURLopensearch = "https://ru.wikipedia.org/w/api.php?action=opensearch&search=";
var apiRequestEnding = "&limit=10&namespace=0&format=json&callback=?";
var output = "";
$(document).ready(function(){
  output += "<div class='list-group'>";
    $("#news-search").keyup(function(event){
    if (event.keyCode == 13){
      $(".output").html("");
      $("#do-search").click();
    }
  });
});
function searchWiki(){
  output = "";
  var keyword = $("#news-search").val();
  var endpointURL = apiEndpointURLopensearch+keyword+apiRequestEnding;
  var name =[], description = [], link = [];
  $.getJSON(endpointURL, function(json){
    if (json[1].length > 0){
      name = json[1];
      description = json[2];
      link = json[3];
      for (var i=0;i<name.length;i++){
        var headingOutput = "<h4 class='list-group-item-heading'>"+name[i]+"</h4>";
        var descriptionOutput;
        if (description[i] != ""){
          descriptionOutput = "<p class='list-group-item-text' id='description'>"+description[i]+"</p>";
        }else{
          descriptionOutput = "<img id='na' src='http://cdn.flaticon.com/svg/16/16096.svg'/>";
        }
        output += "<a href='"+link[i]+"' class='list-group-item' target=_blank><span class='marker'></span>"+headingOutput+descriptionOutput+"</a>";
        if (i === name.length-1){
          output += "</div>";
          $(".output").html(output);
          setMarkerHeight();
        }
      }
    }else{
      output += "<a href='#' class='list-group-item' target=_blank><h4 class='list-group-item-heading'>Ничего не найдено</h4><p class='list-group-item-text' id='description'>Введите другой запрос</p></a></div>";
      $(".output").html(output);
    }
  });
}

function setMarkerHeight(){
  $(".list-group-item-heading").each(function(i,obj){
    var headingHTML = $(this).html();
    var parent = $(this).parent();
    var parentHeight = parent.height();
    var marker = parent.find(".marker");
    marker.hide();
    marker.height(parentHeight);
    parent.mouseover(function(){
      marker.show();
      resetMarkerHeight($(this));
    }).mouseout(function(){
      marker.hide();
    });
  });
}