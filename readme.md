Installing the local database involved digging into the documentation and doing some command-line work.  Homebrew is the recommended way to install a local version of MongoDB.



Looking into it further, it looks like Homebrew solves a lot of the configuration and startup problems immediately

----------


Now the rest of the problem needs thinking through.

"Creating" some data and adding it to the database.
 - Make a variable that's equal to a new instance of Character 


"Reading" the file would involve returning the data as as JSON object.  This you've already done.
- This is what the "homepage" currently does. The .find() method collects all of the instances of Character.

"Updating" will involve reading the file, parsing the data that's passed in from the url router request, 


-----
Installing and using Railway in conjunction with MongoDB and the core Node app.


 Should this app have its own repository?