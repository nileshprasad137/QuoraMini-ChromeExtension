var feeds = [];//stores the feed(initial)
var trending_topics_list = []; //stores  the list of trending topics

var feed_id = [];//stores the ids of feeds
var trending_id = [];//stores the ids of trending topics

var new_feed = [];//stores the newfeed questions

var i,j;//iterator
var latest_feed_id;//stores the latest feed's id
var latest_feed_question = [];//stores all the latest feed's questions
var latest_trending_topic = [];//stores all the trending topics
var latest_trending;

var count = 0;//stores the count of new feeds

$(function()
{
	get_my_feed();
	setInterval(get_my_feed,30000);
	//get the update in an interval of 5 minutes
});

function get_my_feed()
{
	//alert();
	$.get("https://www.quora.com/").done(function(data)
	{
		
		var html_data = data;
		$question_div = $(html_data).find('.QuestionText');				
		$('body').append($question_div);				
		for(i=0;i<5;i++)
		{
			feed_id[i] = $($question_div).find('span:first').eq(i).attr('id');
			//console.log(feed_id[i]);	
			$( "a" ).eq(i).attr( 'href','https://www.quora.com'+ $("a").eq(i).attr('href'));
			feeds[i] =  $($question_div).eq(i).text();
			//console.log(feeds[i]); //debugging purpose
		}
		//console.log(feed_id);
		//console.log(feeds); //debugging purpose

		$trending_topics = $(html_data).find('.EditableList.TrendingTopicsNavList.NavList');
		$('body').append($trending_topics);	

		$no_of_trending = $trending_topics.find(".TrendingTopicNameLink.TopicNameLink.HoverMenu.topic_name").length;		
		for(j=0;j<$no_of_trending;j++)
		{
			$( "a.TrendingTopicNameLink.TopicNameLink.HoverMenu.topic_name" ).eq(j).attr( 'href','https://www.quora.com'+ $("a").eq(j).attr('href'));
			trending_topics_list[j] = $($trending_topics).find('.TopicNameSpan.TopicName').eq(j).text();
			//console.log(trending_topics_list[j]);//debuggnig purpose			
		}

		//console.log(trending_topics_list);
		/*Checking if there any updates..*/
		
		if(latest_feed_question[0] === undefined || latest_feed_question[1] === undefined ||
			latest_feed_question[2] === undefined|| latest_feed_question[3] === undefined || 
			latest_feed_question[4] === undefined)
		{
			//first run on the browser after reload
			var first_run = {
				type : "basic",
				title : "Mini Quora Feed",
				message : "Hey! click on the extension icon on the menu bar for checking your latest Quora feed. ",
				iconUrl : "img/extension_icon.png"
			};

			chrome.notifications.create(first_run);
			//latest_feed_id = feed_id[0];
			for(i=0;i<5;i++)
			{
				latest_feed_question[i] = feeds[i];
			}	

			for(i=0;i<trending_topics_list.length;i++)
			{
				latest_trending_topic[i] = trending_topics_list[i];
				//console.log(latest_trending_topic);//debug
			}


		}

		else
		{
			get_update();
		}

				/*
				//part deleted.
				else if(latest_feed_id == feed_id[0])
				{
					//no update

				}
				else if(latest_feed_id != feed_id[0])
				{
					//update
					for( j=0; j<feed_id.length; j++)
					{
						if(latest_feed_id == feed_id[j])
						{
							break;
						}
						else
						{
							new_feed[j] = feeds[j];
						}	
					}
					latest_feed_id = feed_id[0];
				}

				for(i=0;i<new_feed.length;i++)
				{
					var new_feed_notifier = {
						type : "basic",
						title : "New Feed",
						message : new_feed[i],
						iconUrl : "img/extension_icon.png"
					};
				}

				//chrome.notifications.create(new_feed_notifier);

				*/
	})
	 .fail(function() 
	 {
		    console.log("error in connection..");
	 });
}

function get_update()
{
	var count = 0;//stores the count of new feeds
	for(i=0;i<5;i++)
	{
		//console.log(latest_feed_question[i]);
		if(latest_feed_question[i] == feeds[i])
		{
			count++;
		}
	}

	//console.log(latest_feed_question);
	//console.log(count);

	if(count == 5)
	{
		//no updates

	}
	else
	{
		//update-feed
		for(i=0;i<5;i++)
		{
			latest_feed_question[i] = feeds[i];
		}

		

		var new_feed_notifier = {
				type : "list",
				title : "New Feed.",
				message : "You have a new Feed..",
				iconUrl : "img/extension_icon.png",
				items: 
					[
						{title: "1.", message: latest_feed_question[0]},
		          		{title: "2.", message: latest_feed_question[1]},
		          		{title: "3.", message: latest_feed_question[2]},
		          		{title: "4.", message: latest_feed_question[3]},
		          		{title: "5.", message: latest_feed_question[4]}

		          	]

			};  

			chrome.notifications.create(new_feed_notifier);

	}

	var count_trending = 0 ,flag = 0;
	var trend_to_be_notified;
	for(i=0;i<5;i++)
	{
		if( (trending_topics_list[i] != latest_trending_topic[i]) && (!(trending_topics_list[i] === undefined) )) 
		{
			//new trend 
			flag = 1;
			trend_to_be_notified = trending_topics_list[i];
			break;
		}
		//console.log(trending_topics_list[i]);		
	}

	if(flag == 0)
	{
		//console.log('nothing new');
	}
	else
	{
		var new_trend_notifier = {
				type : "basic",
				title : "New trend",
				message : trend_to_be_notified,
				iconUrl : "img/extension_icon.png"
			};

			chrome.notifications.create(new_trend_notifier);

	}

	//console.log(count_trending);
}

