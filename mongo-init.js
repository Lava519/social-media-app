db.createUser(
    {
        user: "user",
        pwd: "password",
        roles: [
            {
                role: [ { role: "readWrite", db: "social" } ]
            }
        ]
    }
);
