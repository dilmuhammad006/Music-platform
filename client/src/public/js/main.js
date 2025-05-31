import { baseUrl, musicBaseUrl } from "../../../config/base_url";

document.addEventListener("DOMContentLoaded", async () => {
  const container = document.querySelector(".artist-container");
  const errorMessage = document.getElementById("error-message");
  const musicList = document.getElementById("music-list");

  try {
    const res = await fetch(`${baseUrl}/musicians/all`, {
      method: "GET",
      credentials: "include",
    });

    const artists = await res.json();
    if (res.status === 403 || res.status === 401) {
      return (window.location.href = "./pages/login.html");
    }

    document
      .querySelector("header")
      .insertAdjacentHTML(
        "afterbegin",
        `<p class = "email">${artists.email}</p>`
      );
    if (artists.role == "ADMIN") {
      document.querySelector("header").insertAdjacentHTML(
        "beforeend",
        `<button class="add-music">
            <a href="./pages/music.html" class="text-white text-decoration-none d-block">Add music</a>
        </button>
        <br><br>
        <button class="add-music">
            <a href="./pages/musician.html" class="text-white text-decoration-none d-block">Add musicician</a>
        </button>
        `
      );
    }

    if (Array.isArray(artists.data)) {
      container.innerHTML = artists.data
        .map(
          (artist) => `
              <div class="text-center artist-card artist-btn" 
                   data-id="${artist._id}" 
                   style="width: 260px; margin-bottom: 20px; cursor: pointer;">
                <img src="${artist.imageUrl}" class="rounded-circle" 
                     style="width: 180px; height: 180px; object-fit: cover;" alt="${artist.name}">
                <h5 class="text-light mt-2">${artist.nickname}</h5>
                <p class="text-light mt-2">${artist.name}</p>
              </div>`
        )
        .join("");

      function renderMusics(artist) {
        if (artist.musics.length > 0) {
          musicList.innerHTML = artist.musics
            .map(
              (music, index) => `
                <div class="music-card card bg-dark text-light border-secondary shadow-sm mb-3">
                  <div class="card-body">
                    <div class="d-flex align-items-center mb-2 gap-3">
                      <img src="https://img.icons8.com/ios-filled/50/music.png" width="40" height="40" />
                      <div>
                        <h6 class="card-title mb-0">${music.name}</h6>
                        <small class="text-secondary">${music.duration}</small>
                      </div>
                      <small class="ms-auto text-muted">${music.createdAt.substring(
                        0,
                        10
                      )}</small>
                    </div>
                    <audio 
                      controls 
                      data-artist-id="${artist._id}" 
                      data-index="${index}" 
                      style="width: 100%;" class="rounded audio-player">
                      <source src="${baseUrl}${
                music.fileUrl
              }" type="audio/mp4" />
                    </audio>
                  </div>
                </div>`
            )
            .join("");

          const players = document.querySelectorAll(".audio-player");
          players.forEach((player) => {
            player.addEventListener("play", () => {
              localStorage.setItem(
                "lastPlayedArtistId",
                player.dataset.artistId
              );
              localStorage.setItem("lastPlayedIndex", player.dataset.index);
            });

            player.addEventListener("ended", () => {
              const currentIndex = parseInt(player.dataset.index);
              const nextPlayer = document.querySelector(
                `.audio-player[data-index="${currentIndex + 1}"]`
              );
              if (nextPlayer) {
                nextPlayer.play();
              }
            });
          });

          const lastPlayedArtistId = localStorage.getItem("lastPlayedArtistId");
          const lastPlayedIndex = localStorage.getItem("lastPlayedIndex");
          if (
            lastPlayedArtistId === artist._id &&
            lastPlayedIndex !== null &&
            document.querySelector(
              `.audio-player[data-index="${lastPlayedIndex}"]`
            )
          ) {
            const lastPlayer = document.querySelector(
              `.audio-player[data-index="${lastPlayedIndex}"]`
            );
            lastPlayer.play();
          }
        } else {
          musicList.innerHTML =
            "<p class='text-secondary'>No musics available.</p>";
        }
      }

      document.querySelectorAll(".artist-btn").forEach((card) => {
        card.addEventListener("click", () => {
          const artistId = card.getAttribute("data-id");
          const selectedArtist = artists.data.find((a) => a._id === artistId);
          renderMusics(selectedArtist);
        });
      });

      renderMusics(artists.data[0]);
    } else {
      container.innerHTML = "<p class='text-light'>Musicians not found!</p>";
    }

    errorMessage.style.display = "none";
  } catch (err) {
    console.error("Error while connecting to the server", err);
    errorMessage.style.display = "block";
  }
});
