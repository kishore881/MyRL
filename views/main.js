$("#url-form").submit(function (event) {
  event.preventDefault();

  // remove previous alerts
  $(".info")[0].innerHTML = "";

  var $form = $(this),
    oldUrl = $form.find("input[name='oldUrl']").val(),
    customText = $form.find("input[name='customText']").val(),
    url = "/api/myrl/modify";

  var posting = $.post(url, { oldUrl: oldUrl, customText: customText });

  posting.done(function (data) {
    if (data.alExist) alExist(data.newUrl);
    else if (data.newUrl) success(data.newUrl);
    if (data.ctExist) ctExist(data.ctExist);
    if (data.reto) reto(data.reto);
  });
});

function success(newUrl) {
  var content = `<div class="container jumbotron alert alert-primary" role="alert">
                  <a href="${newUrl}" id="foo" target="null">${newUrl}</a>
                  <button type="button" id="bar" class="float-right btn btn-outline-light btn-sm" onclick="copy('#foo')">Copy</button>
                </div>`;
  $(".form-div").after(content);
}

function ctExist(oldUrl) {
  var content = `<div class="alert alert-warning alert-dismissible fade show" role="alert">
                 The custom text <strong>${oldUrl}</strong> is already taken try something else.
                  <button type="button" class="close" data-dismiss="alert" aria-label="Close">
                    <span aria-hidden="true">&times;</span>
                  </button>
                </div>`;
  $(".info")[0].innerHTML = content;
}

function alExist(newUrl) {
  var content = `<div class="container jumbotron alert alert-primary" role="alert">
                  The URL was already shortened to: <br><a href="${newUrl}" id="foo" target="null">${newUrl}</a>
                    <button type="button" id="bar" class="float-right btn btn-outline-light btn-sm" onclick="copy('#foo')">Copy</button>
                </div>`;
  $(".form-div").after(content);
}

function reto(oldUrl) {
  var content = `<div class="alert alert-primary alert-dismissible fade show" role="alert">
                  The provided URL redirects to <a href="${oldUrl}" class="alert-link">${oldUrl}</a> 
                  <button type="button" class="close" data-dismiss="alert" aria-label="Close">
                    <span aria-hidden="true">&times;</span>
                  </button>
                </div>`;
  $(".info")[0].innerHTML = content;
}

function copy(element) {
  $("#bar")[0].innerText = "Copied!";
  var $temp = $("<input>");
  $("body").append($temp);
  $temp.val($(element).html()).select();
  document.execCommand("copy");
  $temp.remove();
}
