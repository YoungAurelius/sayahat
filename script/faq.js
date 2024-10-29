const faqs = document.querySelectorAll('.faq');

faqs.forEach(faq => {
    faq.addEventListener('click', () => {
        faq.classList.toggle('active');
    });
});

let currentlyPlayingAudio = null;

function toggleAudio(audioId, button) {
    const audio = document.getElementById(audioId);

    if (currentlyPlayingAudio && currentlyPlayingAudio !== audio) {
        currentlyPlayingAudio.pause();
        currentlyPlayingAudio.currentTime = 0;
        const previousButton = document.querySelector(`button[onclick="toggleAudio('${currentlyPlayingAudio.id}', this)"]`);
        previousButton.textContent = 'Play';
    }

    if (audio.paused) {
        audio.play();
        button.textContent = 'Pause';
        currentlyPlayingAudio = audio;
    } else {
        audio.pause();
        button.textContent = 'Play';
        currentlyPlayingAudio = null;
    }
}


document.addEventListener('DOMContentLoaded', function () {
    const regionFilter = document.getElementById('regionFilter');
    const boxes = document.querySelectorAll('.box');

    const savedFilter = localStorage.getItem('regionFilter');
    if (savedFilter) {
        regionFilter.value = savedFilter;
        filterDestinations(savedFilter);
    } else {
        filterDestinations('all');
    }

    regionFilter.addEventListener('change', function () {
        const selectedRegion = regionFilter.value;

        localStorage.setItem('regionFilter', selectedRegion);

        filterDestinations(selectedRegion);
    });

    function filterDestinations(region) {
        boxes.forEach(box => {
            const boxRegion = box.getAttribute('data-region');
            if (region === 'all' || boxRegion === region) {
                box.style.display = 'block';
            } else {
                box.style.display = 'none';
            }
        });
    }
});
