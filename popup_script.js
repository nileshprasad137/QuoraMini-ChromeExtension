var notices = [];
var i;
$(function(){
	//alert();
	// Load data from the server using a HTTP GET request.
	$.get("https://www.quora.com/").done(function(data)
	{
		//console.log(data);
		var html_data = data;		
		$question_div = $(html_data).find('.QuestionText');		
		
		for(i=0;i<5;i++)
		{
			$('body').append("<br>");
			$('body').append($question_div.eq(i));
			$('body').append("<br>");
			$( "a" ).eq(i).attr( 'href','https://www.quora.com'+ $("a").eq(i).attr('href'));			
		}	
		

		if($('body').has('.QuestionText').length)
		{
			$('body').append("<hr>");		
			$trending_topics = $(html_data).find('.EditableList.TrendingTopicsNavList.NavList');
			$('body').append($trending_topics);	
			//$trending_topics
			$no_of_trending = $trending_topics.find(".TrendingTopicNameLink.TopicNameLink.HoverMenu.topic_name").length;
			//console.log($no_of_trending);
			for(j=0;j<$no_of_trending;j++)
			{
				$( "a.TrendingTopicNameLink.TopicNameLink.HoverMenu.topic_name" ).eq(j).attr( 'href','https://www.quora.com'+ $("a.TrendingTopicNameLink.TopicNameLink.HoverMenu.topic_name").eq(j).attr('href'));
				$( "a.TrendingTopicNameLink.TopicNameLink.HoverMenu.topic_name" ).eq(j).attr( 'target','_blank');

			}
			$('body').append("<hr>");

		}		

		else
		{
			$("br" ).remove();//remove all the breaklines which were added earlier.
			$('body').append("<div>You are currently logged out of Quora, you need to first login .</div>");
			$('body').append("<hr><a href='https://www.quora.com/' target='_blank'>Login</a><hr>");	
		}					

	})
	.fail(function()
	{
		$('body').append("<div>You are not connected to Internet.</div>");
		$('body').append("(-_-)");

	})
})


