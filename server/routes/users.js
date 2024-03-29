const express = require("express");

const router = express.Router();

const Users = require("../models/Users");
const Students = require("../models/Students");
const Teachers = require("../models/Teachers");
const sequelize = require("sequelize");
const Courses = require("../models/Courses");
const Admin = require("../models/Admins");
const HOD = require("../models/HODS");

router.get("/", (req, res) => {
  const { user_name, role } = req.query;

  console.log(req.query);

  if (user_name) {
    Users.findOne({
      where: {
        user_name,
      },
      include: [
        {
          model: Teachers,
        },
        {
          model: Students,
        },
        {
          model: Admin,
        },
        {
          model: HOD,
        },
      ],
    })
      .then((user) => {
        if (!user) {
          res.status(404).send({ error: true });
        }
        switch (role) {
          case "0":
            res.json({
              user_name: user.user_name,
              password: user.password,
              role: user.role,
              ...user.admin.dataValues,
            });
            break;
          case "1":
            res.json({
              user_name: user.user_name,
              password: user.password,
              role: user.role,
              ...user.teacher.dataValues,
            });
            break;
          case "3":
            res.json({
              user_name: user.user_name,
              password: user.password,
              role: user.role,
              ...user.hod.dataValues,
            });
            break;
          default:
            res.json({
              user_name: user.user_name,
              password: user.password,
              role: user.role,
              ...user.student.dataValues,
            });
            break;
        }
      })
      .catch((e) => {
        res.status(500).send(e);
      });
  } else {
    Users.findAll({
      include: [
        {
          model: Students,
          required: true,
        },
      ],
    })
      .then((users) => {
        res.json(users);
      })
      .catch((e) => {
        res.status(500).send(e);
      });
  }
});

router.get("/count", (req, res) => {
  Students.findAll({
    attributes: [
      "reg_number",
      [sequelize.fn("COUNT", sequelize.col("reg_number")), "n_students"],
    ],
  })
    .then((users) => {
      Teachers.findAll({
        attributes: [
          "phone",
          [sequelize.fn("COUNT", sequelize.col("phone")), "n_teachers"],
        ],
      })
        .then((teachers) => {
          Courses.findAll({
            attributes: [
              "code",
              [sequelize.fn("COUNT", sequelize.col("code")), "n_courses"],
            ],
          })
            .then((courses) => {
              res.json({ users, teachers, courses });
            })
            .catch((e) => {
              res.status(500).send(e);
            });
        })
        .catch((e) => {
          res.status(500).send(e);
        });
    })
    .catch((e) => {
      res.status(500).send(e);
    });
});

router.post("/edit", (req, res) => {
  const { email, phone, password, user_name, role, description } = req.body;

  if (password) {
    Users.update(
      {
        password,
      },
      {
        where: {
          user_name,
        },
      }
    ).then((user) => {
      if (role === 2) {
        Students.update(
          {
            email,
            phone,
          },
          {
            where: {
              reg_number: user_name,
            },
          }
        )
          .then((student) => {
            res.json(student);
          })
          .catch((e) => {
            res.status(500).send(e);
          });
      }
      if (role === 3) {
        HOD.update(
          {
            email,
            phone,
            description,
          },
          {
            where: {
              phone: user_name,
            },
          }
        )
          .then((hod) => {
            res.json(hod);
          })
          .catch((e) => {
            res.status(500).send(e);
          });
      }
      if (role === 1) {
        Teachers.update(
          {
            email,
            phone,
          },
          {
            where: {
              phone: user_name,
            },
          }
        )
          .then((teacher) => {
            res.json(teacher);
          })
          .catch((e) => {
            res.status(500).send(e);
          });
      }
    });
  }
  if (role === 2) {
    Students.update(
      {
        email,
        phone,
      },
      {
        where: {
          reg_number: user_name,
        },
      }
    )
      .then((student) => {
        res.json(student);
      })
      .catch((e) => {
        res.status(500).send(e);
      });
  }
  if (role === 3) {
    HOD.update(
      {
        email,
        phone,
        description,
      },
      {
        where: {
          phone: user_name,
        },
      }
    )
      .then((hod) => {
        res.json(hod);
      })
      .catch((e) => {
        res.status(500).send(e);
      });
  }
  if (role === 1) {
    return Teachers.update(
      {
        email,
        phone,
      },
      {
        where: {
          phone: user_name,
        },
      }
    )
      .then((teacher) => {
        res.json(teacher);
      })
      .catch((e) => {
        res.status(500).send(e);
      });
  }
});

//login
router.post("/login", (req, res) => {
  const { user_name, password } = req.body;

  Users.findOne({
    where: {
      user_name,
      password,
    },
    include: [
      {
        model: Teachers,
      },
      {
        model: Students,
      },
      {
        model: Admin,
      },
      {
        model: HOD,
      },
    ],
  })
    .then((user) => {
      if (!user) {
        res.status(404).send(user);
      }

      switch (user.role) {
        case 0:
          res.json({
            user_name: user.user_name,
            password: user.password,
            role: user.role,
            ...user.admin.dataValues,
          });
          break;
        case 1:
          res.json({
            user_name: user.user_name,
            password: user.password,
            role: user.role,
            ...user.teacher.dataValues,
          });
          break;
        case 3:
          res.json({
            user_name: user.user_name,
            password: user.password,
            role: user.role,
            ...user.hod.dataValues,
          });
          break;
        default:
          res.json({
            user_name: user.user_name,
            password: user.password,
            role: user.role,
            ...user.student.dataValues,
          });
          break;
      }
    })
    .catch((e) => {
      res.status(404).send(e);
    });
});

//enroll

module.exports = router;
