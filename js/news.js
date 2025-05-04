document.addEventListener('DOMContentLoaded', () => {
    // --- Configuration ---
    const loadMoreButton = document.getElementById('load-more-news');
    const newsContainer = document.getElementById('news-grid-container');
    //const newsJsonUrl = 'https://sandwichcakestudios.github.io/news.json'; // Using the static JSON URL
	const newsJsonUrl = '/news.json';
    const itemsPerLoad = 4; // How many items to load each time

    // --- State ---
    let currentOffset = 0; // Tracks how many items are currently displayed
    let allNewsData = []; // To store all fetched news data
    let isFetching = false; // Prevent multiple simultaneous fetches
    let initialDataLoaded = false; // Flag to check if data has been fetched once

    // --- Function to create a single news article element ---
    function createNewsArticleElement(item) {
        // Make sure we have the expected data
        if (!item || !item.imageSrc || !item.altText || !item.date || !item.title || !item.linkUrl) {
            //console.warn('Skipping news item due to missing data:', item);
            //return null; // Return null if data is incomplete
        }

        const article = document.createElement('article');
        article.className = 'news-item';
		
		if(item.imageSrc){
			article.innerHTML = `
				<a href="${item.linkUrl}" target="_blank" rel="noopener noreferrer">
					<img src="${item.imageSrc}" alt="${item.altText}" loading="lazy">
					<div class="news-item-content">
						<span class="news-item-date">${item.date}</span>
						<h3 class="news-item-title">${item.title}</h3>
						<p>${item.text}</p>
					</div>
				</a>
			`;	
			
		}
		
		if(item.svg){
			article.innerHTML = `
				<a href="${item.linkUrl}" target="_blank" rel="noopener noreferrer">
					${item.svg}
					<div class="news-item-content">
						<span class="news-item-date">${item.date}</span>
						<h3 class="news-item-title">${item.title}</h3>
						<p>${item.text}</p>
					</div>
				</a>
			`;	
			
		}
		
		if(!item.svg && !item.imageSrc){
			article.innerHTML = `
				<a href="${item.linkUrl}" target="_blank" rel="noopener noreferrer">
					<div class="news-item-content">
						<span class="news-item-date">${item.date}</span>
						<h3 class="news-item-title">${item.title}</h3>
						<p>${item.text}</p>
					</div>
				</a>
			`;	
			
		}
        
        return article;
    }

    // --- Function to load and display news items ---
    async function loadMoreNews() {
        if (isFetching) return; // Don't fetch if already fetching
        isFetching = true;
        loadMoreButton.disabled = true; // Disable button during fetch
        // Optional: Add a loading indicator text/class
        loadMoreButton.textContent = 'Loading...';

        try {
            // Fetch all data only once if we haven't already
            if (!initialDataLoaded) {
                const response = await fetch(newsJsonUrl);
                if (!response.ok) {
                    throw new Error(`HTTP error! Status: ${response.status}`);
                }
                allNewsData = await response.json(); // Assuming the JSON is an array of news items
                initialDataLoaded = true;
                console.log(`Workspaceed ${allNewsData.length} total news items.`);
            }

            // Determine the slice of data to load next
            const startIndex = currentOffset;
            const endIndex = currentOffset + itemsPerLoad;
            const itemsToLoad = allNewsData.slice(startIndex, endIndex);

            if (itemsToLoad.length > 0) {
                // Create and append elements for the new items
                itemsToLoad.forEach(item => {
                    const articleElement = createNewsArticleElement(item);
                    if (articleElement) { // Only append if the element was created successfully
                       newsContainer.appendChild(articleElement);
                    }
                });

                // Update the offset
                currentOffset += itemsToLoad.length;

                // Check if there are more items to load
                if (currentOffset >= allNewsData.length) {
                    // No more items, hide the button
                    loadMoreButton.style.display = 'none'; // Or loadMoreButton.hidden = true;
                    console.log('All news items loaded.');
                } else {
                    // Still more items, re-enable button for next click
                    loadMoreButton.disabled = false;
                    loadMoreButton.textContent = 'Load More News'; // Reset button text
                }
            } else {
                // If slice returned empty (shouldn't happen if previous check worked, but safe)
                loadMoreButton.style.display = 'none';
                console.log('No more news items to load.');
            }

        } catch (error) {
            console.error('Failed to load news:', error);
            // Optionally display an error message to the user
            loadMoreButton.textContent = 'Error Loading'; // Indicate error
            // Keep the button disabled or hide it on error, depending on desired UX
             loadMoreButton.disabled = true;
        } finally {
            isFetching = false; // Allow fetching again
             // Ensure button text/state is reasonable even if an error occured mid-process
            if (loadMoreButton.style.display !== 'none' && !loadMoreButton.disabled) {
                 loadMoreButton.textContent = 'Load More News';
            }
        }
    }

    // --- Event Listener ---
    if (loadMoreButton && newsContainer) {
        loadMoreButton.addEventListener('click', loadMoreNews);
        // Optional: You might want to trigger an initial load automatically
        // loadMoreNews(); // Uncomment this line to load the first batch on page load
    } else {
        console.error('Required elements (#load-more-news or #news-grid-container) not found.');
    }
});