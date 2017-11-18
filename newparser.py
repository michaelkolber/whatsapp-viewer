import re
from sys import exit


def prepout(pos):
    source = open('assets/output_source.txt', 'r', encoding='utf8')
    if pos == 'start':
        for i in range(29):
            output.write(source.readline())
        source.close()
    elif pos == 'end':
        for i in range(29):
            source.readline()
        for i in range(30, 36):
            output.write(source.readline())
        source.close()


path = ""
try:    #Test to see if the inputted path is valid
    print()
    while True:
        try:
            path = input("Enter the path to the _chat.txt file that came in the exported zip: ")
            test = open(path)
            test.close
            break
        except OSError:
            print("Invalid filepath, try again.")
            print()

    print('Processing...')

    messages = []
    with open(path, errors='replaxmlcharrefreplacece', encoding='utf8') as chat_file:
        while True:
            line = chat_file.readline()
            message = line.split(' ', maxsplit=3)

            if re.search(r'\d\d?\/\d\d?\/\d\d?', message[0]):
                try:
                    messages[-1][-1] = messages[-1][-1][:-1]
                except IndexError:
                    pass
                message[3] = message.extend(message[3].split(': ', maxsplit=1))
                if len(message) < 5:
                    continue
                del message[3]
                message[0] = message[0][:-1]
                message[2] = message[2][:-1]
                messages.append(message)
            else:
                messages[-1][4] += line

            if line == '':
                break

    participants = []
    last_participant = ''

    output = open('output.html', 'w', errors='xmlcharrefreplace')
    prepout('start')

    currdate = '00/00/00'

    for message in messages:

        if len(message) == 4:
            output.write(f'<div class="datecontainer">\n\t<div class="date">\n{message[3]}\n</div>\n</div>\n\n')
            last_participant = 'SPECIAL_SENDER_NOTICE'
            continue

        sender = message[3]
        if sender not in participants:
            participants.append(sender)

        if last_participant != sender:
            output.write('<div class="space"></div>\n\n')
            last_participant = sender

        if message[0] != currdate:
            output.write(f'<div class="datecontainer"><div class="date">{message[0]}</div></div>\n')
            currdate = message[0]

        output.write(f'<div class="message {participants.index(sender)}')
        if participants.index(sender) == 0:
            output.write(' sender')
        output.write('">\n<p>')
        output.write(message[4])
        output.write(f'</p>\n<div class = "time">{message[1][:-3]} {message[2]}</div>\n</div>\n\n')

    output.write(f'<num_of_participants class="{len(participants) - 1}"></num_of_participants>\n<participants class="{participants.list()}"\n\n')

    prepout('end')
    output.close()

    print('Success! Open \'output.html\' in your web browser to view.')
    print()

except KeyboardInterrupt:
    print()
    print()
    exit()


#TODO: Make apostrophes work by acutally knowing encoding; Make line breaks work
