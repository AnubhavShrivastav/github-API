require("dotenv").config();
const express = require("express");
const axios = require("axios");
const app = express();
const router = express.Router();
app.use(express.json());



// GitHub API Base URL
const GITHUB_API = "https://api.github.com";
const { GITHUB_USERNAME, GITHUB_TOKEN } = process.env;

// GitHub Auth Headers
const headers = {
    Authorization: `token ${GITHUB_TOKEN}`,
    Accept: "application/vnd.github.v3+json",
  };


// GET /github → Fetch GitHub user data
router.get("/github", async (req, res) => {
    try {
      const user = await axios.get(`${GITHUB_API}/users/${GITHUB_USERNAME}`, {
        headers,
      });
  
      res.json({
        username: user.login,
        followers: user.followers,
        following: user.following,
        public_repos: user.public_repos,
        
      });
 
      res.json(user.data);

    } catch (error) {
      res.status(500).json({ error: "Error fetching GitHub data" });
    }
  });
  

//  GET /github/:repoName → Fetch repository details

router.get("/github/:repoName", async (req, res) => {
  try {
    const repoName = req.params.repoName;
    const { data } = await axios.get(
      `${GITHUB_API}/repos/${GITHUB_USERNAME}/${repoName}`,
      { headers }
    );

    res.json({
      name: data.name,
      description: data.description,
      stars: data.stargazers_count,
      forks: data.forks_count,
      open_issues: data.open_issues_count,
      repo_url: data.html_url,
    });
  } catch (error) {
    res.status(500).json({ error: "Error fetching repository data" });
  }
});


// POST /github/:repoName/issues → Create a new issue in the repo

router.post("/github/:repoName/issues", async (req, res) => {
  try {
    const repoName = req.params.repoName;
    const { title, body } = req.body;

    if (!title || !body) {
      return res.status(400).json({ error: "Title and body are required" });
    }

    const { data } = await axios.post(
      `${GITHUB_API}/repos/${GITHUB_USERNAME}/${repoName}/issues`,
      { title, body },
      { headers }
    );

    res.json({
      message: "Issue created successfully!",
      issue_url: data.html_url,
    });
  } catch (error) {
    res.status(500).json({ error: "Error creating issue" });
  }
});

