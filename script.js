document.addEventListener("DOMContentLoaded", function () {
  var header = document.getElementById("main-header");
  var prevScrollPos = window.pageYOffset;

  window.onscroll = function () {
    var currentScrollPos = window.pageYOffset;

    if (prevScrollPos > currentScrollPos) {
      header.style.top = "0";
    } else {
      header.style.top = "-70px";  
    }

    if (currentScrollPos === 0) {
      header.style.backgroundColor = "rgba(255, 102, 0, 1)";
    } else {
      header.style.backgroundColor = "rgba(255, 102, 0, 0.1)";
    }

    prevScrollPos = currentScrollPos;
  };

  var navLinks = document.querySelectorAll('nav a');

  navLinks.forEach(function (link) {
    link.addEventListener('click', function () {
      navLinks.forEach(function (navLink) {
        navLink.classList.remove('active');
      });
      link.classList.add('active');
    });
  });
});

const postsContainer = document.getElementById("posts");
const paginationContainer = document.getElementById("pagination");
const sortSelect = document.getElementById("sort");
const perPageSelect = document.getElementById("perPage");

let postsData = [];
let currentPage = 1;
let postsPerPage = parseInt(perPageSelect.value);

function renderPosts() {
    postsContainer.innerHTML = "";
    const start = (currentPage - 1) * postsPerPage;
    const end = start + postsPerPage;
    const currentPosts = postsData.slice(start, end);

    currentPosts.forEach(post => {
        const postCard = document.createElement("div");
        postCard.classList.add("post-card");

        const thumbnail = document.createElement("div");
        thumbnail.classList.add("thumbnail");
        const thumbnailImage = document.createElement("img");
        thumbnailImage.src = post.thumbnail;
        thumbnail.appendChild(thumbnailImage);

        const date = document.createElement("div");
        date.classList.add("date");
        date.textContent = formatPostDate(post.date);

        const title = document.createElement("div");
        title.classList.add("title");
        title.textContent = post.title;

        postCard.appendChild(thumbnail);
        postCard.appendChild(date);
        postCard.appendChild(title);
        postsContainer.appendChild(postCard);
    });
}

function renderPagination() {
  const totalPages = Math.ceil(postsData.length / postsPerPage);
  const paginationContainer = document.getElementById("pagination");
  paginationContainer.innerHTML = "";

  for (let i = 1; i <= totalPages; i++) {
      const pageButton = document.createElement("span");
      pageButton.textContent = i;
      pageButton.classList.add("pagination-number");
      pageButton.addEventListener("click", () => {
          currentPage = i;
          renderPosts();
          renderPagination();
      });

      if (i === currentPage) {
          pageButton.classList.add("active");
      }

      paginationContainer.appendChild(pageButton);
  }

  const prevButton = document.querySelector('.pagination-link.prev');
  const nextButton = document.querySelector('.pagination-link.next');
  const firstButton = document.querySelector('.pagination-link.first');
  const lastButton = document.querySelector('.pagination-link.last');

  if (currentPage > 1) {
      prevButton.classList.remove('disabled');
      firstButton.classList.remove('disabled');
  } else {
      prevButton.classList.add('disabled');
      firstButton.classList.add('disabled');
  }

  if (currentPage < totalPages) {
      nextButton.classList.remove('disabled');
      lastButton.classList.remove('disabled');
  } else {
      nextButton.classList.add('disabled');
      lastButton.classList.add('disabled');
  }
  updateShowInfo();
}

  

function prevPage() {
  if (currentPage > 1) {
      currentPage--;
      renderPosts();
      renderPagination();
  }
}

function nextPage() {
  const totalPages = Math.ceil(postsData.length / postsPerPage);
  if (currentPage < totalPages) {
      currentPage++;
      renderPosts();
      renderPagination();
  }
}

function goToFirstPage() {
  currentPage = 1;
  renderPosts();
  renderPagination();
}

function goToLastPage() {
  const totalPages = Math.ceil(postsData.length / postsPerPage);
  currentPage = totalPages;
  renderPosts();
  renderPagination();
}


function sortPosts() {
    const sortBy = sortSelect.value;
    if (sortBy === "latest") {
        postsData.sort((a, b) => new Date(b.date) - new Date(a.date));
    } else if (sortBy === "oldest") {
        postsData.sort((a, b) => new Date(a.date) - new Date(b.date));
    }

    currentPage = 1;
    renderPosts();
    renderPagination();
}

function changePerPage() {
    postsPerPage = parseInt(perPageSelect.value);
    currentPage = 1;
    renderPosts();
    renderPagination();
}

function changePerPage() {
  postsPerPage = parseInt(perPageSelect.value);
  currentPage = 1;
  renderPosts();
  renderPagination();
  updateShowInfo();
}

function updateShowInfo() {
  const showFrom = (currentPage - 1) * postsPerPage + 1;
  const showTo = Math.min(showFrom + postsPerPage - 1, postsData.length);
  const totalItems = postsData.length;

  document.getElementById('show-from').textContent = showFrom;
  document.getElementById('show-to').textContent = showTo;
  document.getElementById('total-items').textContent = totalItems;
}


function formatPostDate(dateString) {
    const options = { month: 'long', day: 'numeric', year: 'numeric' };
    return new Date(dateString).toLocaleDateString(undefined, options);
}


postsData = [
    { title: "Kenali Tingkatan Influencers Berdasarkan Jumlah Followers", thumbnail: "post-thumbnail1.jpeg", date: "09-05-2022" },
    { title: "Jangan Asal Pilih Influencer, Berikut Cara Menyusun Strategi Influencer di dunia Digital", thumbnail: "post-thumbnail2.jpeg", date: "09-06-2022" },
    { title: "Kenali Tingkatan Influencers Berdasarkan Jumlah Followers", thumbnail: "post-thumbnail1.jpeg", date: "09-07-2022" },
    { title: "Jangan Asal Pilih Influencer, Berikut Cara Menyusun Strategi Influencer di dunia Digital", thumbnail: "post-thumbnail2.jpeg", date: "09-08-2022" },
    { title: "Kenali Tingkatan Influencers Berdasarkan Jumlah Followers", thumbnail: "post-thumbnail1.jpeg", date: "09-09-2022" },
    { title: "Jangan Asal Pilih Influencer, Berikut Cara Menyusun Strategi Influencer di dunia Digital", thumbnail: "post-thumbnail2.jpeg", date: "09-10-2022" },
    { title: "Kenali Tingkatan Influencers Berdasarkan Jumlah Followers", thumbnail: "post-thumbnail1.jpeg", date: "09-15-2022" },
    { title: "Jangan Asal Pilih Influencer, Berikut Cara Menyusun Strategi Influencer di dunia Digital", thumbnail: "post-thumbnail2.jpeg", date: "09-16-2022" },
    { title: "Kenali Tingkatan Influencers Berdasarkan Jumlah Followers", thumbnail: "post-thumbnail1.jpeg", date: "09-25-2022" },
    { title: "Jangan Asal Pilih Influencer, Berikut Cara Menyusun Strategi Influencer di dunia Digital", thumbnail: "post-thumbnail2.jpeg", date: "09-26-2022" },
    { title: "Kenali Tingkatan Influencers Berdasarkan Jumlah Followers", thumbnail: "post-thumbnail1.jpeg", date: "10-05-2022" },
    { title: "Jangan Asal Pilih Influencer, Berikut Cara Menyusun Strategi Influencer di dunia Digital", thumbnail: "post-thumbnail2.jpeg", date: "10-06-2022" },
    { title: "Kenali Tingkatan Influencers Berdasarkan Jumlah Followers", thumbnail: "post-thumbnail1.jpeg", date: "10-07-2022" },
    { title: "Jangan Asal Pilih Influencer, Berikut Cara Menyusun Strategi Influencer di dunia Digital", thumbnail: "post-thumbnail2.jpeg", date: "10-08-2022" },
    { title: "Kenali Tingkatan Influencers Berdasarkan Jumlah Followers", thumbnail: "post-thumbnail1.jpeg", date: "10-09-2022" },    
    { title: "Jangan Asal Pilih Influencer, Berikut Cara Menyusun Strategi Influencer di dunia Digital", thumbnail: "post-thumbnail2.jpeg", date: "10-10-2022" },
    { title: "Kenali Tingkatan Influencers Berdasarkan Jumlah Followers", thumbnail: "post-thumbnail1.jpeg", date: "10-11-2022"},    
    { title: "Jangan Asal Pilih Influencer, Berikut Cara Menyusun Strategi Influencer di dunia Digital", thumbnail: "post-thumbnail2.jpeg", date: "10-12-2022" },
    { title: "Kenali Tingkatan Influencers Berdasarkan Jumlah Followers", thumbnail: "post-thumbnail1.jpeg", date: "10-13-2022" },  
    { title: "Jangan Asal Pilih Influencer, Berikut Cara Menyusun Strategi Influencer di dunia Digital", thumbnail: "post-thumbnail2.jpeg", date: "10-14-2022" },
    { title: "Kenali Tingkatan Influencers Berdasarkan Jumlah Followers", thumbnail: "post-thumbnail1.jpeg", date: "10-15-2022" }, 
    { title: "Jangan Asal Pilih Influencer, Berikut Cara Menyusun Strategi Influencer di dunia Digital", thumbnail: "post-thumbnail2.jpeg", date: "10-16-2022" },
    { title: "Kenali Tingkatan Influencers Berdasarkan Jumlah Followers", thumbnail: "post-thumbnail1.jpeg", date: "10-17-2022" },  
    { title: "Jangan Asal Pilih Influencer, Berikut Cara Menyusun Strategi Influencer di dunia Digital", thumbnail: "post-thumbnail2.jpeg", date: "10-18-2022" },
    { title: "Kenali Tingkatan Influencers Berdasarkan Jumlah Followers", thumbnail: "post-thumbnail1.jpeg", date: "10-19-2022" }, 
    { title: "Jangan Asal Pilih Influencer, Berikut Cara Menyusun Strategi Influencer di dunia Digital", thumbnail: "post-thumbnail2.jpeg", date: "10-20-2022" },
    { title: "Kenali Tingkatan Influencers Berdasarkan Jumlah Followers", thumbnail: "post-thumbnail1.jpeg", date: "10-21-2022" },
    { title: "Jangan Asal Pilih Influencer, Berikut Cara Menyusun Strategi Influencer di dunia Digital", thumbnail: "post-thumbnail2.jpeg", date: "10-22-2022" },
    { title: "Kenali Tingkatan Influencers Berdasarkan Jumlah Followers", thumbnail: "post-thumbnail1.jpeg", date: "10-23-2022" },
    { title: "Jangan Asal Pilih Influencer, Berikut Cara Menyusun Strategi Influencer di dunia Digital", thumbnail: "post-thumbnail2.jpeg", date: "10-24-2022" },
    { title: "Kenali Tingkatan Influencers Berdasarkan Jumlah Followers", thumbnail: "post-thumbnail1.jpeg", date: "12-07-2022" },   
    { title: "Jangan Asal Pilih Influencer, Berikut Cara Menyusun Strategi Influencer di dunia Digital", thumbnail: "post-thumbnail2.jpeg", date: "12-16-2022" },
    { title: "Kenali Tingkatan Influencers Berdasarkan Jumlah Followers", thumbnail: "post-thumbnail1.jpeg", date: "01-01-2023" },   
    { title: "Jangan Asal Pilih Influencer, Berikut Cara Menyusun Strategi Influencer di dunia Digital", thumbnail: "post-thumbnail2.jpeg", date: "01-07-2023" },
    { title: "Kenali Tingkatan Influencers Berdasarkan Jumlah Followers", thumbnail: "post-thumbnail1.jpeg", date: "02-04-2023" },   
    { title: "Jangan Asal Pilih Influencer, Berikut Cara Menyusun Strategi Influencer di dunia Digital", thumbnail: "post-thumbnail2.jpeg", date: "03-18-2023" },
    { title: "Kenali Tingkatan Influencers Berdasarkan Jumlah Followers", thumbnail: "post-thumbnail1.jpeg", date: "04-07-2023" },   
    { title: "Jangan Asal Pilih Influencer, Berikut Cara Menyusun Strategi Influencer di dunia Digital", thumbnail: "post-thumbnail2.jpeg", date: "05-16-2023" },
    { title: "Kenali Tingkatan Influencers Berdasarkan Jumlah Followers", thumbnail: "post-thumbnail1.jpeg", date: "06-07-2023" },   
    { title: "Jangan Asal Pilih Influencer, Berikut Cara Menyusun Strategi Influencer di dunia Digital", thumbnail: "post-thumbnail2.jpeg", date: "07-16-2023" },
    { title: "Kenali Tingkatan Influencers Berdasarkan Jumlah Followers", thumbnail: "post-thumbnail1.jpeg", date: "08-07-2023" },   
    { title: "Jangan Asal Pilih Influencer, Berikut Cara Menyusun Strategi Influencer di dunia Digital", thumbnail: "post-thumbnail2.jpeg", date: "09-16-2023" },
];

sortPosts();
