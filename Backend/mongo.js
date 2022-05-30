
const MongoClient = require("mongodb").MongoClient;
const url = "mongodb+srv://indraneel:user_pass@cluster0.kbdd5.mongodb.net/OpenBill_main?retryWrites=true&w=majority";

const createUser = async (req, res, next) => {
    const newUser = {
        email: req.body.email,
        password: req.body.password
      };
      const client = new MongoClient(url);
    
      try {
        await client.connect();
        const db = client.db('OpenBill_main');
        const result = db.collection('Users').insertOne(newUser);
      } catch (error) {
        return res.json({message: 'Could not store data.'});
      };
      client.close();
    
      res.json(newUser);
};

exports.createUser = createUser;