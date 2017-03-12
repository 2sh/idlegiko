// ==UserScript==
// @name          IdleGiko
// @namespace     idlegiko
// @description   Prevent Gikopoi timeouts
// @include       http://l4cs.jpn.org/gikopoi/flash/gikopoi*/flash_gikopoi.html
// @version       1.1.3
// @grant         none
// @updateURL     https://github.com/2sh/idlegiko/raw/master/idlegiko.user.js
// ==/UserScript==
(function(doc, win)
{
	var textAreaPhone = doc.getElementById('message_txt');
	function sendMessage(message)
	{
		textAreaPhone.removeAttribute('id');
		doc.gikopoi.JSCallBackSendMessage(message);
		textAreaPhone.setAttribute('id', 'message_txt');
	}
	
	var objectGikopoi = doc.getElementById('gikopoi');
	objectGikopoi.getElementsByTagName('embed')[0]
		.setAttribute('wmode', 'transparent');
	objectGikopoi.innerHTML = objectGikopoi.innerHTML;
	
	var altTextArea = doc.createElement('textarea');
	altTextArea.style.display = 'none';
	altTextArea.style.position = 'absolute';
	altTextArea.style.top = '362px';
	altTextArea.style.left = '12px';
	altTextArea.style.width = '380px';
	altTextArea.style.height = '80px';
	
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
		sendMessage(altTextArea.value);
		altTextArea.value = '';
	});
	
	doc.body.appendChild(altButton);
	doc.body.appendChild(altTextArea);
	
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
		if(altTextArea.style.display == "none")
			altTextArea.style.display = altButton.style.display = 'block';
		else
			altTextArea.style.display = altButton.style.display = 'none';
	});
	divPanel.appendChild(buttonInput);
	
	var divTimer = doc.createElement('div');
	divTimer.style.color = 'black';
	divTimer.style.position = 'absolute';
	divTimer.style.right = 0;
	divTimer.style.fontSize = '24px';
	divPanel.appendChild(divTimer);
	
	doc.body.appendChild(divPanel);
	
	var keepAliveTime = null;
	function countDownLoop()
	{
		if(keepAliveTime === null)
		{
			divTimer.style.color = 'black';
			keepAliveTime = new Date().getTime() + (25 * 60 * 1000);
		}
		var left =  Math.round((keepAliveTime - new Date().getTime()) / 1000);
		if(left > 0)
		{
			var minutes = '0' + Math.floor(left / 60);
			var seconds = '0' + (left - (minutes * 60));
			divTimer.textContent = minutes.substr(-2) + ':' + seconds.substr(-2);
			if(left <= 10) divTimer.style.color = 'red';
		}
		else
		{
			sendMessage('');
			divTimer.textContent = '00:00';
			keepAliveTime = null;
		}
	}
	
	setInterval(countDownLoop, 1000);
	countDownLoop();
})(document, window);
