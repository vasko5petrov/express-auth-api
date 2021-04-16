// - GET - /getUser?id={i} # returns a user with id i
export const getUser = (req, res, next) => {
    const User = {
        FirstName: 'John',
        LastName: 'Doe',
        Email: 'john@test.com'
    };

    res.send(User);
};

// - POST - /createUser # creates a user
export const createUser = async (req, res, next) => {
    res.send(req.body);
};

