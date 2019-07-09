import React, {useEffect, useState} from 'react';
import './App.css';

function getGithubRepos() {
  return fetch(
    "https://api.github.com/search/repositories?q=stars:%3E25000+language:javascript&sort=stars&order=desc"
  )
  .then(data => data.json())
}

function App() {
  const [repoList, setRepoList] = useState(null);
  console.log("repo list:", repoList);


  useEffect(() => {
    getGithubRepos()
      .then(results => 
        results.items.map( ({full_name, stargazers_count, html_url, id}) => {
          // throw new Error("ERREORRERER");
          return { full_name, stargazers_count, html_url, id }
        })
      )
      .then(repoList => setRepoList(repoList))
      .catch( err => setRepoList([]))
  }, []);


  return (
    <div className="App">
    {repoList === null ? <div>Loading...</div> 
      : repoList.length > 0 ? ( 
        <table>
          <tbody>
            <tr>
              <th>Full Name</th>
              <th>Stars</th>
              <th>Link</th>
            </tr>
            {repoList.map( repo => {
              return (
                <tr key={repo.id}>
                  <td>{repo.full_name}</td>
                  <td>{repo.stargazers_count}</td>
                  <td><a href={repo.html_url}>{repo.html_url} </a></td>
                </tr>
              )
            })}
          </tbody>
        </table>
      ) : <div>Error: try again</div>
      }
    </div>
  );
}

export default App;
