// var data = {
//   nama: "",
//   komentar: "",
//   id: null,
// };

function hapus() {
  document.getElementById("input-nama").value = "";
  document.getElementById("komentar").value = "";
}

function kirim() {
  if (
    document.getElementById("input-nama").value &&
    document.getElementById("komentar").value
  ) {
    const data = {
      nama: document.getElementById("input-nama").value,
      komentar: document.getElementById("komentar").value,
    };
    console.log(data);
    setComments(data);
    renderComments();
    hapus();
  } else {
    alert("Tolong Cek Input Anda");
  }
}

const cache_key = "all_comments";

function setComments(comment_data) {
  let comments = null;
  if (localStorage.getItem(cache_key) === null) {
    comments = [];
  } else {
    comments = JSON.parse(localStorage.getItem(cache_key));
  }
  comments.unshift(comment_data);
  localStorage.setItem(cache_key, JSON.stringify(comments));
}

function showComments() {
  if (typeof Storage !== "undefined") {
    return JSON.parse(localStorage.getItem(cache_key)) || [];
  } else {
    return [];
  }
}

function renderComments() {
  const comments = showComments();
  let commentList = document.querySelector("#comments-container");
  commentList.innerHTML = "";
  for (let comment of comments) {
    let row = document.createElement("div");
    row.setAttribute("class", "comment-content");
    row.innerHTML = "<img src=./asset/gambar/profile.png>";
    let row2 = document.createElement("div");
    row2.setAttribute("class", "comments-inner");
    row2.innerHTML += "<div class=name>" + comment.nama + "</div>";
    row2.innerHTML += "<div class=comment>" + comment.komentar + "</div>";
    row.appendChild(row2);
    commentList.appendChild(row);
  }
}

document.onload(renderComments());
