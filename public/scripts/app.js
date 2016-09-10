console.log ('app.js is linked!');
var allProTips = [];
var protips;
var $voteList;
var protipId;


$(document).ready(function() {
  $voteList = $('#voteWrapper');

  $.ajax({
    method:'GET',
    url: '/api/protips',
    dataType: 'json',
    success: onSuccess,
    error: error
  });

  $('body').on('click', '.up-button', upVote);

  $('body').on('click', '.down-button', downVote);

  $('#newProTipForm').on('submit', submitNewProTip);
});

function submitNewProTip (event) {
  event.preventDefault();
  console.log('new protip serialized', $(this).serialize());
  $.ajax({
    method: 'POST',
    url: '/api/protips',
    data: $(this).serialize(),
    success: newProTipSuccess,
    error: error
  });
  location.reload();
}

function newProTipSuccess (json) {
  console.log('new ProTip created');
  allProTips = json;
  render([allProTips]);
}

function render () {
  var source = $('#voteTile').html();
  var template = Handlebars.compile(source);
  var votesHtml = template({ proTipVote: allProTips });
  // $voteList.empty();
  $voteList.append(votesHtml);
  }

function onSuccess(json) {
  allProTips = json;
  render(allProTips);
}

function error(error) {
   console.log(error);
}

function upVote (event) {
  console.log('you pressed up');
  console.log($(this).attr('data-id'));
  $.ajax({
   method: 'PUT',
   url: '/api/protips/'+$(this).attr('data-id'),
   dataType: 'json',
   data: {voteStatus: 'up'},
   success: onSuccess,
   error: error
 });
 location.reload();
}

function downVote (event) {
  console.log('you pressed down');
  console.log($(this).attr('data-id'));
  $.ajax({
    method: 'PUT',
    url: '/api/protips/'+$(this).attr('data-id'),
    dataType: 'json',
    data: {voteStatus: 'down'},
    success: onSuccess,
    error: error
  });
  location.reload();
}
