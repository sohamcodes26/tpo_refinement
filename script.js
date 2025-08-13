document.addEventListener('DOMContentLoaded', function () {
    const themeToggle = document.getElementById('theme-toggle');
    const body = document.body;
    const sidebar = document.getElementById('sidebar');
    const openSidebarBtn = document.getElementById('openSidebarBtn');
    const sidebarOverlay = document.querySelector('.sidebar-overlay');
    const desktopSidebarToggle = document.getElementById('desktopSidebarToggle');
    const sidebarItems = document.querySelectorAll('.sidebar-item');
    const pageSections = document.querySelectorAll('.page-section');
    const registrationForm = document.getElementById('registrationForm');
    const successModal = document.getElementById('successModal');
    const closeModalButton = successModal.querySelector('.close-button');

    // Function to switch between pages
    function showSection(targetId) {
        pageSections.forEach(section => {
            if (section.id === targetId) {
                section.classList.remove('hidden');
            } else {
                section.classList.add('hidden');
            }
        });
    }

    // Sidebar navigation
    sidebarItems.forEach(item => {
        item.addEventListener('click', function (e) {
            e.preventDefault();

            // Manage active state for sidebar items
            sidebarItems.forEach(i => i.classList.remove('active'));
            this.classList.add('active');

            // Show the corresponding page section
            const targetId = this.getAttribute('data-target');
            if (targetId) {
                showSection(targetId);
            }

            // Close sidebar on mobile after clicking an item
            if (window.innerWidth < 768) {
                sidebar.classList.remove('open');
                sidebarOverlay.style.display = 'none';
                body.style.overflow = '';
            }
        });
    });

    // Theme toggling
    themeToggle.addEventListener('click', () => {
        body.classList.toggle('dark-mode');
        const icon = themeToggle.querySelector('i');
        if (body.classList.contains('dark-mode')) {
            icon.classList.remove('fa-moon');
            icon.classList.add('fa-sun');
        } else {
            icon.classList.remove('fa-sun');
            icon.classList.add('fa-moon');
        }
    });

    // Mobile sidebar toggle
    openSidebarBtn.addEventListener('click', () => {
        sidebar.classList.add('open');
        sidebarOverlay.style.display = 'block';
        body.style.overflow = 'hidden'; // Prevent background scroll
    });

    sidebarOverlay.addEventListener('click', () => {
        sidebar.classList.remove('open');
        sidebarOverlay.style.display = 'none';
        body.style.overflow = '';
    });

    // Desktop sidebar collapse/expand
    desktopSidebarToggle.addEventListener('click', () => {
        sidebar.classList.toggle('collapsed');
        const icon = desktopSidebarToggle.querySelector('i');
        if (sidebar.classList.contains('collapsed')) {
            icon.classList.remove('fa-chevron-left');
            icon.classList.add('fa-chevron-right');
        } else {
            icon.classList.remove('fa-chevron-right');
            icon.classList.add('fa-chevron-left');
        }
    });
    
    // Registration form submission
    if (registrationForm) {
        registrationForm.addEventListener('submit', function(e) {
            e.preventDefault();
            // In a real app, you'd process the form data here
            console.log('Form submitted');
            successModal.classList.remove('hidden');
            registrationForm.reset();
        });
    }

    // Modal close functionality
    if (closeModalButton) {
        closeModalButton.addEventListener('click', () => {
            successModal.classList.add('hidden');
        });
    }

    window.addEventListener('click', (event) => {
        if (event.target === successModal) {
            successModal.classList.add('hidden');
        }
    });


    // Responsive adjustments
    const handleResize = () => {
        const h1Element = document.querySelector('#eduplusLogo h1');
        const imgElement = document.querySelector('#eduplusLogo img');
        const sidebarSpans = document.querySelectorAll('.sidebar-item span, .sidebar-footer span');

        if (window.innerWidth >= 768) {
            // Desktop view
            openSidebarBtn.classList.add('hidden'); // Hide mobile hamburger
            desktopSidebarToggle.classList.remove('hidden'); // Show desktop toggle
            sidebar.classList.remove('open'); // Ensure mobile 'open' state is removed
            sidebarOverlay.style.display = 'none';
            body.style.overflow = '';

            // Handle collapsed state on desktop
            if (sidebar.classList.contains('collapsed')) {
                sidebarSpans.forEach(span => span.style.display = 'none');
                h1Element.style.display = 'none';
                imgElement.classList.remove('mr-3');
                imgElement.classList.add('mr-0');
            } else {
                sidebarSpans.forEach(span => span.style.display = 'block');
                h1Element.style.display = 'block';
                imgElement.classList.add('mr-3');
                imgElement.classList.remove('mr-0');
            }
        } else {
            // Mobile view
         
            sidebar.classList.remove('open');
            sidebarOverlay.style.display = 'none';
            body.style.overflow = '';
            openSidebarBtn.classList.remove('hidden'); 
            desktopSidebarToggle.classList.add('hidden'); 

            
            if (sidebar.classList.contains('open')) {
                sidebarSpans.forEach(span => span.classList.remove('hidden'));
                h1Element.classList.remove('hidden');
                imgElement.classList.add('mr-3');
                imgElement.classList.remove('mr-0');
            } else {
                sidebarSpans.forEach(span => span.classList.add('hidden'));
                h1Element.classList.add('hidden');
                imgElement.classList.remove('mr-3');
                imgElement.classList.add('mr-0');
            }
        }
    };

    window.addEventListener('resize', handleResize);

   
    handleResize();
    
    showSection('home-page');
});
