**MP-wordtomd Components Library**

This library contains a converter of documents docx to markdown. This
will enable to fast create the text inherent to the CVT apps.
Additionally, this app has a markdown preview to able to edit and copy
the needed files.


**Prerequisites**

This application runs using the npm pandoc application

For running the **app**, it is mandatory to run the server and the app

-   For running the server

    -   Cd server -\> npm i and npm start

-   For running the app

    -   Cd app -\> npm I and npm start

**Structure of the app**

Structure
	wordtomd
					
	

```
	Server
	        -convert the file (npm pandoc)
		    -dowload the file (js-file-download)

			App (react)
    			   node_modules
    			   public
    			   src
				components
					FileUploader
					    FileUploader.js
                                        Message.js
	                                    Progress.js
					    MarkDown
						  Markdwon.js
			
```