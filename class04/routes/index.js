import Router from "express";
import fs from "fs";

const routes = Router();

const datajson = fs.readFileSync("data.json", "utf-8"); // Read string-json from file
const users = JSON.parse(datajson); // Parse to JSON

// {host}/api/...

// GET all users
routes.get("/1", (req, res) => {
  res.send(users);
});

// GET user with age and remove birthYear
routes.get("/2", (req, res) => {
  const usersWithAge = users.map((user) => {
    const age = new Date().getFullYear() - user.birthYear;
    delete user.birthYear;
    return { ...user, age };
  });
  res.send(usersWithAge);
});

// GET all different skills
routes.get("/3", (req, res) => {
  const skills = users.reduce((acc, user) => {
    user.skills.forEach((skill) => {
      if (!acc.includes(skill)) {
        acc.push(skill);
      }
    });
    return acc;
  }, []);
  res.send(skills);
});

// GET all different degrees and return degree
routes.get("/4", (req, res) => {
  const degrees = users.reduce((acc, user) => {
    user.degrees.forEach((degree) => {
      if (!acc.includes(degree.degree)) {
        acc.push(degree.degree);
      }
    });
    return acc;
  }, []);
  res.send(degrees);
});

// GET all users w/grade >= :PARAM and round grade to 1 unit if not found return 404
routes.get("/5/:grade", (req, res) => {
  const { grade } = req.params;
  const usersWithGrade = users.filter((user) => {
    const userGrade = user.degrees.find(
      (degree) => Math.round(degree.grade) >= grade
    );
    if (userGrade) {
      return user;
    }
  });
  if (usersWithGrade.length === 0) {
    res.status(404).send("No users found");
  } else {
    res.send(usersWithGrade);
  }
});

// GET one user by id if not fin return 404
routes.get("/6/:id", (req, res) => {
  const user = users.find((user) => user.id == req.params.id);
  if (!user) {
    res.status(404).send({ message: "User not found" });
  }
  res.send(user);
});

// POST get all by institute
routes.post("/7", (req, res) => {
  const { institute } = req.body;
  const usersByInstitute = users.filter((user) => {
    const userInstitute = user.degrees.find(
      (degree) => degree.institute === institute
    );
    if (userInstitute) {
      return user;
    }
  });
  if (usersByInstitute.length === 0) {
    res.status(404).send("No users found");
  } else {
    res.send(usersByInstitute);
  }
});

// POST new user push skills and degrees even if they do not exist
routes.post("/8", (req, res) => {
    const { name, birthYear, skills, degrees } = req.body;
    const newUser = {
        id: (getRandomInt(100)),
        name,
        birthYear,
        skills: skills ?? [],
        degrees: degrees ?? [ { institute: "", degree: "", grade: 0 } ]
    }
    users.push(newUser);

    const fileData = JSON.stringify(users);
    fs.writeFileSync("data.json", fileData, "utf-8");
    res
      .status(201)
      .send({ message: "User created", data: newUser });
})

// Function random number
function getRandomInt(max) {
    return Math.floor(Math.random() * max);
}

// PUT user by id if nothing was changed keep old data
routes.put("/9/:id", (req, res) => {
    const { id } = req.params;
    const { name, birthYear, skills, degrees } = req.body;
    const user = users.find((user) => user.id == id);
    if (!user) {
        res.status(404).send({ message: "User not found" });
    }
    user.name = name ?? user.name;
    user.birthYear = birthYear ?? user.birthYear;
    user.skills = skills ?? user.skills;
    user.degrees = degrees ?? user.degrees;

    const fileData = JSON.stringify(users);
    fs.writeFileSync("data.json", fileData, "utf-8");
    res
        .status(201)
        .send({ message: "User updated successfully", data: user });
})

// PUT remove one skill by id
routes.put("/10/:id", (req, res) => {
    const { id } = req.params;
    const { skill } = req.body;
    const user = users.find((user) => user.id == id);
    if (!user) {
        res.status(404).send({ message: "User not found" });
    }
    const userSkill = user.skills.find((userSkill) => userSkill === skill);
    if (!userSkill) {
        res.status(404).send({ message: "Skill not found" });
    }
    user.skills = user.skills.filter((userSkill) => userSkill !== skill);

    const fileData = JSON.stringify(users);
    fs.writeFileSync("data.json", fileData, "utf-8");
    res
        .status(201)
        .send({ message: "Skill removed successfully", data: user });
})

// PUT remove one degree by id
routes.put("/11/:id", (req, res) => {
    const { id } = req.params;
    const { institute, degree } = req.body;
    const user = users.find((user) => user.id == id);
    if (!user) {
        res.status(404).send({ message: "User not found" });
    }
    const userDegree = user.degrees.find((userDegree) => userDegree.institute === institute && userDegree.degree === degree);
    if (!userDegree) {
        res.status(404).send({ message: "Degree not found" });
    }
    user.degrees = user.degrees.filter((userDegree) => userDegree.institute !== institute && userDegree.degree !== degree);

    const fileData = JSON.stringify(users);
    fs.writeFileSync("data.json", fileData, "utf-8");
    res
        .status(201)
        .send({ message: "Degree removed successfully", data: user });
})

// DELETE user by id
routes.delete("/12/:id", (req, res) => {
    const { id } = req.params;
    const user = users.find((user) => user.id == id);
    if (!user) {
        res.status(404).send({ message: "User not found" });
    }
    const index = users.indexOf(user);
    users.splice(index, 1);

    const fileData = JSON.stringify(users);
    fs.writeFileSync("data.json", fileData, "utf-8");
    res
        .status(201)
        .send({ message: "User deleted successfully", data: user });
})


export { routes };
