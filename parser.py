def handler(event, context):
    if event == "loadsamplefile":
        return {"names": ["Adam", "John"], "chat": "<div class=\"datecontainer\"><div) class=\"date\">24/12/2015</div></div><div class=\"message away\"><p class=\"text\">Hey, have you heard about WhatsApp Viewer?</p><div class=\"time\">1:37:51</div></div>\n<div class=\"space\"></div>\n<div class=\"message home\"><p class=\"text\">Aren't you the one who made it...?</p><div class=\"time\">1:39:53</div></div>\n<div class=\"space\"></div>\n<div class=\"message away\"><p class=\"text\">Yeah, and? What's your point?</p><div class=\"time\">1:40:21</div></div>\n<div class=\"space\"></div>\n<div class=\"message home\"><p class=\"text\">This is the most shameless plug I've ever seen. Wow.</p><div class=\"time\">1:40:26</div></div>\n<div class=\"space\"></div>\n<div class=\"message away\"><p class=\"text\">...</p><div class=\"time\">1:40:38</div></div>\n"}
    else:
        import re
        
        #Make sure carriage returns in text messages aren't counted when splitting up the Export File
        messages = []
        chat = event
        split = chat.split('\r\n')
        for entry in split:
            parsed = re.split(r', |: ', entry, maxsplit=3)
            if len(parsed) == 4:
                messages.append(parsed)
        
        
        #Get the names of the participants
        participants_found = 0
        participants = []
        message_up_to = 0
        while participants_found < 2:
            if messages[message_up_to][2] not in participants:
                participants.append(messages[message_up_to][2])
                participants_found += 1
            message_up_to += 1
            
        #Generate the HTML
        html = open("/tmp/parsedhtml.txt", "w")
        
        last_participant = participants[0]
        date_up_to = "00/00/0000"
        for message in messages:
            message[3] = re.sub(r'\n', r'<br>', message[3], flags=re.MULTILINE)
                
            #Add a space between messages of opposite parties
            if message[2] != last_participant:
                html.write('<div class="space"></div>\n')
                last_participant = message[2]
        
            #Check if a date marker is needed
            if message[0] != date_up_to:
                html.write('<div class="datecontainer"><div) class="date">%s</div></div>' % (message[0]))
                date_up_to = message[0]
                    
            html.write('<div class="message ')
                
            #Determine which side the message should be on
            if message[2] == participants[0]:
                html.write('away')
            elif message[2] == participants[1]:
                html.write('home')
            else:
                print "ERROR: Sender '%s' of message is unkown. WhatsApp Viewer will assume message was sent to uploader. Message text: %s" % (message[2], message[3])
                html.write('away')
                
            #Print the rest of the HTML
            html.write('"><p class="text">%(mess)s</p><div class="time">%(time)s</div></div>\n' % {'mess': message[3], 'time': message[1]})
        html.close
        html = open("/tmp/parsedhtml.txt", "r")
        return {"names": participants, "chat": html.read()}
