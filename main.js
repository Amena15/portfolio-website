/* ----- NAVIGATION BAR FUNCTION ----- */
// Updated in your main.js
function myMenuFunction() {
  const menu = document.getElementById("myNavMenu");
  const icon = document.querySelector(".nav-menu-btn i");
  
  menu.classList.toggle("responsive");
  
  // Change icon based on state
  if (menu.classList.contains("responsive")) {
      icon.classList.remove("uil-bars");
      icon.classList.add("uil-times");
      document.body.style.overflow = 'hidden'; // Prevent scrolling when menu is open
  } else {
      icon.classList.remove("uil-times");
      icon.classList.add("uil-bars");
      document.body.style.overflow = '';
  }
}

// Close menu when clicking on a link
document.querySelectorAll('.nav-link').forEach(link => {
  link.addEventListener('click', () => {
      if (window.innerWidth <= 900) { // Match your mobile breakpoint
          myMenuFunction();
      }
  });
});


/* ----- ADD SHADOW ON NAVIGATION BAR WHILE SCROLLING ----- */
  window.onscroll = function() {headerShadow()};
  function headerShadow() {
    const navHeader =document.getElementById("header");
    if (document.body.scrollTop > 50 || document.documentElement.scrollTop >  50) {
      navHeader.style.boxShadow = "0 1px 6px rgba(0, 0, 0, 0.1)";
      navHeader.style.height = "70px";
      navHeader.style.lineHeight = "70px";
    } else {
      navHeader.style.boxShadow = "none";
      navHeader.style.height = "90px";
      navHeader.style.lineHeight = "90px";
    }
  }
/* ----- TYPING EFFECT ----- */
 var typingEffect = new Typed(".typedText",{
    strings : ["Junior Software Engineer","Web Developer","Application Developer","Full-Stack Developer Intern", ],
    loop : true,
    typeSpeed : 100, 
    backSpeed : 80,
    backDelay : 2000
 })
/* ----- ## -- SCROLL REVEAL ANIMATION -- ## ----- */
 const sr = ScrollReveal({
        origin: 'top',
        distance: '80px',
        duration: 2000,
        reset: true     
 })
/* -- HOME -- */
sr.reveal('.featured-text-card',{})
sr.reveal('.featured-name',{delay: 100})
sr.reveal('.featured-text-info',{delay: 200})
sr.reveal('.featured-text-btn',{delay: 200})
sr.reveal('.social_icons',{delay: 200})
sr.reveal('.featured-image',{delay: 300})

/* -- PROJECT BOX -- */
sr.reveal('.project-box',{interval: 200})
/* -- HEADINGS -- */
sr.reveal('.top-header',{})
/* ----- ## -- SCROLL REVEAL LEFT_RIGHT ANIMATION -- ## ----- */
/* -- ABOUT INFO & CONTACT INFO -- */
const srLeft = ScrollReveal({
  origin: 'left',
  distance: '80px',
  duration: 2000,
  reset: true
})

srLeft.reveal('.about-info',{delay: 100})
srLeft.reveal('.contact-info',{delay: 100})

/* -- ABOUT SKILLS & FORM BOX -- */
const srRight = ScrollReveal({
  origin: 'right',
  distance: '80px',
  duration: 2000,
  reset: true
})

srRight.reveal('.skills-box',{delay: 100})
srRight.reveal('.form-control',{delay: 100})

// Add subtle stagger animation to skills
document.querySelectorAll('.skills-list span').forEach((skill, index) => {
  skill.style.transitionDelay = `${index * 50}ms`;
});

// Add click-to-copy functionality (optional)
document.querySelectorAll('.skills-list span').forEach(skill => {
  skill.addEventListener('click', function() {
      const tempInput = document.createElement('input');
      tempInput.value = this.textContent;
      document.body.appendChild(tempInput);
      tempInput.select();
      document.execCommand('copy');
      document.body.removeChild(tempInput);
      
      // Visual feedback
      const originalText = this.textContent;
      this.textContent = 'Copied!';
      setTimeout(() => {
          this.textContent = originalText;
      }, 1000);
  });
});

/* ----- CHANGE ACTIVE LINK ----- */

const sections = document.querySelectorAll('section[id]')
function scrollActive() {
  const scrollY = window.scrollY;
  sections.forEach(current =>{
    const sectionHeight = current.offsetHeight,
        sectionTop = current.offsetTop - 50,
      sectionId = current.getAttribute('id')
    if(scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) { 
        document.querySelector('.nav-menu a[href*=' + sectionId + ']').classList.add('active-link')
    }  else {
      document.querySelector('.nav-menu a[href*=' + sectionId + ']').classList.remove('active-link')
    }
  })
}
window.addEventListener('scroll', scrollActive)


document.getElementById('collaborateBtn').addEventListener('click', function() {
  // Option 1: Scroll to contact section smoothly
  document.getElementById('contact').scrollIntoView({
      behavior: 'smooth'
  });
  
  // Analytics tracking (if you have it set up)
  console.log('Collaboration button clicked');
});


// Add this for resume download 
document.getElementById('downloadResumeBtn').addEventListener('click', function() {
  // Method 1: If you have the file hosted
  window.open('path/to/your/resume.pdf', '_blank');
  
  // Method 2: For tracking downloads
  const link = document.createElement('a');
  link.href = 'https://drive.google.com/file/d/157S6PXBNm-UlMDBl0_eCSKb3ocjeN2Su/view?usp=share_link';
  link.download = 'Amena_Mohamed_Resume.pdf';
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  
  // Track download event
  console.log('Resume downloaded');
});

function downloadResume(button) {
  const fileId = '157S6PXBNm-UlMDBl0_eCSKb3ocjeN2Su';
  const downloadUrl = `https://drive.google.com/uc?export=download&id=${fileId}`;

  // Show loading state
  const icon = button.querySelector('i');
  const originalIcon = icon.className;
  icon.className = 'uil uil-spinner uil-spin';
  button.disabled = true;

  // Create hidden download link
  const link = document.createElement('a');
  link.href = downloadUrl;
  link.download = 'Amena_Mohamed_Resume.pdf'; // Forces download with this name
  link.style.display = 'none';
  document.body.appendChild(link);

  // Trigger download
  link.click();

  // Handle success/error
  link.onload = () => {
      icon.className = 'uil uil-check-circle'; // Success icon
      setTimeout(() => {
          icon.className = originalIcon;
          button.disabled = false;
      }, 2000);
  };

  link.onerror = () => {
      icon.className = 'uil uil-exclamation-triangle'; // Error icon
      button.disabled = false;
      setTimeout(() => { icon.className = originalIcon; }, 3000);
  };

  // Clean up
  setTimeout(() => document.body.removeChild(link), 100);
}

// Apply to all download buttons
document.querySelectorAll('.download-resume-btn').forEach(btn => {
  btn.addEventListener('click', (e) => {
      e.preventDefault();
      downloadResume(btn);
  });
});


/* Message box control */
document.querySelector('.form-button .btn').addEventListener('click', function(e) {
  e.preventDefault();
  // Add form validation and submission logic here
  alert('Message sent!'); // Temporary
});



async function fetchGitHubRepos() {
  try {
    const response = await fetch('https://api.github.com/users/Amena15/repos?sort=updated&direction=desc');
    if (!response.ok) throw new Error('GitHub API error');
    const repos = await response.json();

    const filtered = repos.filter(repo => !repo.fork);
    document.querySelector('.loader')?.remove();
    showProjects(filtered.slice(0, 6)); // Show latest 6

  } catch (err) {
    console.error(err);
    document.querySelector('.loader')?.remove();
    const errorDiv = document.createElement('div');
    errorDiv.className = 'error-message';
    errorDiv.innerHTML = '<p>⚠️ Failed to load projects. Please try again later.</p>';
    document.getElementById('projects-container').appendChild(errorDiv);
  }
}

function showProjects(repos) {
  const container = document.getElementById('projects-container');
  repos.forEach(repo => {
    const div = document.createElement('div');
    div.className = 'project-card';
    div.innerHTML = `
      <div class="project-content">
        <h3>${repo.name}</h3>
        <p>${repo.description || 'No description available.'}</p>
        <div class="project-meta">
          <span><strong>Language:</strong> ${repo.language || 'N/A'}</span>
          <span><strong>Stars:</strong> ⭐ ${repo.stargazers_count}</span>
        </div>
        <div class="project-links">
          <a class="btn" href="${repo.html_url}" target="_blank">View Code</a>
        </div>
      </div>
    `;
    container.appendChild(div);
  });
}

document.addEventListener('DOMContentLoaded', fetchGitHubRepos);


/*------------------------------------------------------ */
// Add this to your main.js
document.querySelectorAll('.social_icons a').forEach(icon => {
  icon.addEventListener('click', function(e) {
      // You can add analytics tracking here
      console.log(`Social link clicked: ${this.getAttribute('aria-label')}`);
  });
});

// Form submission
document.getElementById('sendMessageBtn').addEventListener('click', function(e) {
  e.preventDefault();
  const name = document.querySelector('.input-field[type="text"]').value;
  const email = document.querySelector('.input-field[type="email"]').value;
  const message = document.querySelector('textarea').value;
  
  if(name && email && message) {
      // Here you would typically send to a server
      console.log({name, email, message});
      alert('Thank you for your message!');
  } else {
      alert('Please fill all fields');
  }
});

// Improved menu toggle
function myMenuFunction() {
  document.getElementById("myNavMenu").classList.toggle("responsive");
}


// Add this to your main.js
document.getElementById('contactForm').addEventListener('submit', async function(e) {
  e.preventDefault();
  
  const form = e.target;
  const status = document.getElementById('formStatus');
  const button = form.querySelector('button[type="submit"]');
  
  // Get form values
  const data = {
      name: document.getElementById('contactName').value,
      email: document.getElementById('contactEmail').value,
      message: document.getElementById('contactMessage').value
  };
  
  // UI feedback
  button.disabled = true;
  button.innerHTML = 'Sending... <i class="uil uil-spinner-alt uil-spin"></i>';
  status.textContent = '';
  
  try {
      // Replace with your actual endpoint
      const response = await fetch('https://your-api-endpoint.com/send', {
          method: 'POST',
          headers: {
              'Content-Type': 'application/json',
          },
          body: JSON.stringify(data)
      });
      
      if (response.ok) {
          status.textContent = 'Message sent successfully!';
          status.style.color = 'green';
          form.reset();
      } else {
          throw new Error('Network response was not ok');
      }
  } catch (error) {
      status.textContent = 'Failed to send message. Please try again later.';
      status.style.color = 'red';
      console.error('Error:', error);
  } finally {
      button.disabled = false;
      button.innerHTML = 'Send Message <i class="uil uil-message"></i>';
  }
});

// Add to your main.js
const scrollToTopBtn = document.getElementById('scrollToTopBtn');

window.addEventListener('scroll', () => {
    if (window.pageYOffset > 300) {
        scrollToTopBtn.style.display = 'flex';
    } else {
        scrollToTopBtn.style.display = 'none';
    }
});

scrollToTopBtn.addEventListener('click', () => {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
});