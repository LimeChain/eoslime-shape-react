# eoslime-shape-react

The project is a complete and ready to use dApp with predefined React front-end and EOSLime integration. It consists of an EOS smart contract, deployment script, unit tests and a web part. The dApp represents a simple todo list, showing how to read and record a data on the blockchain through the browser. In gives a helpful example and foundation for a further development of more sophisticated dApp/s.

In order to get the project up and running you need to do the following steps:

1. Install eoslime
```
    npm install -g eoslime
```

2. Download the shape (recommended is to use a new empty folder)
```
    eoslime shape react
```

3. Get in the root project folder
```
    cd eoslime-shape-react
```

You should see the following tidy structure:

[screenshot of project structure]

4. Install the project dependencies
```
    npm install
```

5. Start a local nodeos instance
```
    eoslime nodeos
```    

6. [optional] Run the smart contract tests
```
    eoslime test
```

7. Compile the smart contract
```
    eoslime compile
```

8. Deploy compiled smart contract on local blockchain
```    
    eoslime deploy
```

9. Run the web part
```
    npm start
```
Performing the command will open the browser on http://localhost:3000/

[screenshot of dApp frontend]

Now you have everything you need to start using the smart contract from the React dApp. Each performed interaction with the blockchain will be displayed in the Transaction monitor, providing the following details: todo's name, action name and tx hash.

[screenshot of Transaction monitor]