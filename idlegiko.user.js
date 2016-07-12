// ==UserScript==
// @name			IdleGiko
// @namespace		idlegiko
// @description		Prevent Gikopoi timeouts
// @include			http://l4cs.jpn.org/gikopoi/flash/gikopoi*/flash_gikopoi.html
// @version			1.0.0
// @grant			none
// ==/UserScript==
(function(doc, win)
{
	var textareaPhone = doc.getElementById('message_txt');
	function sendMessage(message)
	{
		textareaPhone.removeAttribute('id');
		doc.gikopoi.JSCallBackSendMessage(message);
		textareaPhone.setAttribute('id', 'message_txt');
	}
	
	var altTextarea = doc.createElement('textarea');
	altTextarea.style.display = 'none';
	altTextarea.style.position = 'absolute';
	altTextarea.style.top = '362px';
	altTextarea.style.left = '12px';
	altTextarea.style.width = '380px';
	altTextarea.style.height = '80px';
	
	var altButton = doc.createElement('button');
	altButton.style.display = 'none';
	altButton.setAttribute('type', 'button');
	altButton.textContent = 'Send';
	altButton.style.position = 'absolute';
	altButton.style.top = '445px';
	altButton.style.left = '280px';
	altButton.style.width = '60px';
	altButton.style.height = '28px';
	altButton.addEventListener('click', function()
	{
		sendMessage(altTextarea.value);
		altTextarea.value = '';
	});
	
	doc.body.appendChild(altButton);
	doc.body.appendChild(altTextarea);
	
	var divPanel = doc.createElement('div');
	divPanel.style.position = 'fixed';
	divPanel.style.top = 0;
	divPanel.style.right = 0;
	
	var buttonRula = doc.createElement('button');
	buttonRula.textContent = 'Rula';
	buttonRula.addEventListener('click', function()
	{
		sendMessage('#rula');
	});
	divPanel.appendChild(buttonRula);
	
	var buttonList = doc.createElement('button');
	buttonList.textContent = 'List';
	buttonList.addEventListener('click', function()
	{
		sendMessage('#list');
	});
	divPanel.appendChild(buttonList);
	
	var buttonInput = doc.createElement('button');
	buttonInput.textContent = 'Input';
	buttonInput.addEventListener('click', function()
	{
		if(altTextarea.style.display == "none")
			altTextarea.style.display = altButton.style.display = 'block';
		else
			altTextarea.style.display = altButton.style.display = 'none';
	});
	divPanel.appendChild(buttonInput);
	
	var divTimer = doc.createElement('div');
	divTimer.style.color = 'black';
	divTimer.style.position = 'absolute';
	divTimer.style.right = 0;
	divTimer.style.fontSize = '24px';
	divPanel.appendChild(divTimer);
	
	doc.body.appendChild(divPanel);
	
	var keepAliveTime;
	function startCountDown()
	{
		divTimer.style.color = 'black';
		keepAliveTime = (new Date().getTime()) + 25 * 60 * 1000;
		countDownLoop();
	}
	
	function countDownLoop()
	{
		var left = (keepAliveTime - (new Date().getTime())) / 1000;
		var leftSeconds = Math.round(left);
		var wait = (left - (leftSeconds - 1)) * 1000;
		
		if(left < 0.5)
		{
			sendMessage('');
			divTimer.textContent = '00:00';
			setTimeout(startCountDown, wait);
		}
		else
		{
			var minutes = '0' + Math.floor(leftSeconds / 60);
			var seconds = '0' + (leftSeconds - minutes * 60);
			divTimer.textContent = minutes.substr(-2) + ':' + seconds.substr(-2);
			if (left < 10.5)
			{
				divTimer.style.color = 'red';
			}
			setTimeout(countDownLoop, wait);
		}
	}
	
	startCountDown();
})(document, window);
