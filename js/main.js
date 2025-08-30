// Initialize AOS with modern settings
document.addEventListener('DOMContentLoaded', function() {
  AOS.init({
    duration: 800,
    easing: 'ease-in-out-quad',
    once: true,
    offset: 100
  });


  // Scroll to top button
  const scrollBtn = document.createElement('div');
  scrollBtn.className = 'scroll-top';
  scrollBtn.innerHTML = '<i class="fas fa-arrow-up"></i>';
  document.body.appendChild(scrollBtn);

  window.addEventListener('scroll', () => {
    scrollBtn.classList.toggle('active', window.scrollY > 300);
  });

  scrollBtn.addEventListener('click', (e) => {
    e.preventDefault();
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  });

  // Smooth page transitions
  document.querySelectorAll('a[href^="#"], a[href^="/"], a[href^="http"]').forEach(link => {
    if (link.hostname === window.location.hostname || link.href.includes('#')) {
      link.addEventListener('click', (e) => {
        if (!link.hash || link.pathname !== window.location.pathname) {
          e.preventDefault();
          document.body.classList.add('fade-out');
          setTimeout(() => {
            window.location.href = link.href;
          }, 500);
        }
      });
    }
  });

  // Project filter functionality
  const filterButtons = document.querySelectorAll('.filter-btn');
  if (filterButtons.length > 0) {
    filterButtons.forEach(button => {
      button.addEventListener('click', () => {
        // Remove active class from all buttons
        filterButtons.forEach(btn => btn.classList.remove('active'));
        
        // Add active class to clicked button
        button.classList.add('active');
        
        // Get filter value
        const filterValue = button.getAttribute('data-filter');
        
        // Filter projects
        const projects = document.querySelectorAll('.project-card');
        projects.forEach(project => {
          if (filterValue === 'all' || project.getAttribute('data-category') === filterValue) {
            project.style.display = 'block';
          } else {
            project.style.display = 'none';
          }
        });
      });
    });
  }

  // Visitor counter
  if (document.getElementById('visitor-count')) {
    let count = localStorage.getItem('visitorCount') || 0;
    count++;
    localStorage.setItem('visitorCount', count);
    document.getElementById('visitor-count').textContent = count;
  }

  // Typing effect
  if (document.getElementById('typing-text')) {
    const texts = ["Halo, Saya Asrul👋", "Web Developer", "UI Designer", "Tech Enthusiast"];
    let count = 0;
    let index = 0;
    let currentText = '';
    let letter = '';
    
    (function type() {
      if (count === texts.length) {
        count = 0;
      }
      
      currentText = texts[count];
      letter = currentText.slice(0, ++index);
      
      document.getElementById('typing-text').textContent = letter;
      
      if (letter.length === currentText.length) {
        setTimeout(() => {
          count++;
          index = 0;
          setTimeout(type, 1000);
        }, 2000);
      } else {
        setTimeout(type, 100);
      }
    })();
  }

  // Animate skill meters
  const skillMeters = document.querySelectorAll('.meter span');
  if (skillMeters.length > 0) {
    skillMeters.forEach(meter => {
      const targetWidth = meter.style.width;
      meter.style.width = '0';
      
      setTimeout(() => {
        meter.style.width = targetWidth;
      }, 500);
    });
  }

  // Live clock
  if (document.getElementById('time')) {
    function updateClock() {
      const now = new Date();
      const options = { 
        hour: '2-digit', 
        minute: '2-digit', 
        second: '2-digit',
        timeZone: 'Asia/Jakarta'
      };
      document.getElementById('time').textContent = now.toLocaleTimeString('id-ID', options);
    }
    setInterval(updateClock, 1000);
    updateClock();
  }

  // Random quote generator
  if (document.getElementById('random-quote')) {
    const quotes = [
      "Teknologi adalah alat, bukan tujuan akhir. - Dafid",
      "Belajar satu baris kode setiap hari.",
      "Kreativitas adalah kecerdasan yang bersenang-senang. - Albert Einstein",
      "Kode yang baik adalah seperti puisi yang baik. - Douglas Crockford",
      "The only way to learn a new programming language is by writing programs in it. - Dennis Ritchie"
    ];
    document.getElementById('random-quote').textContent = 
      quotes[Math.floor(Math.random() * quotes.length)];
  }
});

// ... kode JS kamu yang sudah ada sebelumnya


// ==== Tambahan Lightbox & Proteksi Shortcut ====

// Close lightbox by button
closeLightbox.addEventListener('click', function() {
    lightbox.classList.remove('active');
});

// Close when clicking outside image
lightbox.addEventListener('click', function(e) {
    if (e.target === lightbox) {
        lightbox.classList.remove('active');
    }
});

// Close with ESC key
document.addEventListener('keydown', function(e) {
    if (e.key === 'Escape' && lightbox.classList.contains('active')) {
        lightbox.classList.remove('active');
    }
});

// Disable Ctrl+U, Ctrl+S, F12
document.addEventListener("keydown", (event) => {
    if ((event.ctrlKey && (event.key === "u" || event.key === "U" || event.key === "s" || event.key === "S")) || event.key === "F12") {
        event.preventDefault();
    }
});
