chrome.tabs.onUpdated.addListener(function(tabId, changeInfo, tab) {
    checkCloseTab(tabId, changeInfo, tab);
});

chrome.tabs.onCreated.addListener(function(tabId, changeInfo, tab) {         
   checkCloseTab(tabId, changeInfo, tab);
});

function checkCloseTab(tabId, changeInfo, tab) 
{
	if (typeof changeInfo !== 'undefined')
	{
		if (typeof changeInfo.url !== 'undefined' && changeInfo.url !== '')
		{
			if (changeInfo.url.toLowerCase().indexOf('closealltwitch.tv') != -1)
			{
				// Url changed.
                                var queryinfo = new Object();
                                queryinfo.url = '*://www.twitch.tv/*';
                                chrome.tabs.query(queryinfo, function(resultTabs) {
                                        for( var idx in resultTabs ) {
                                                        chrome.tabs.remove(resultTabs[idx].id);
                                        }
                                        chrome.tabs.remove(tabId);
                                });
			}
		}
	}
}
