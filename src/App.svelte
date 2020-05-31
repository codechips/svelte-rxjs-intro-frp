<style>
  :global(*, *:before, *:after) {
    box-sizing: border-box;
  }
  :global(body) {
    font-family: sans-serif;
    background-color: #f4fffc;
  }
  .container {
    display: flex;
    min-height: 98vh;
    justify-content: center;
    align-items: center;
  }
  ul {
    list-style: none;
    max-width: 30em;
    padding: 0;
  }
  .user {
    display: flex;
    align-items: center;
    padding: 12px 18px 12px 12px;
    background-color: #d0ece7;
  }
  li {
    margin-top: 0.5em;
    min-width: 30em;
  }
  .user a {
    font-size: 1.65em;
    text-decoration: none;
    color: #2e2e2e;
    font-weight: 600;
  }
  .user a:hover {
    text-decoration: underline;
  }
  .user img {
    width: 48px;
    height: 48px;
    margin-right: 12px;
    border-radius: 9999px;
  }
  .user button {
    margin-left: auto;
    border: none;
    padding: 6px 12px;
    background-color: #666;
    font-weight: 600;
    color: #fefefe;
  }
  .refresh {
    border: none;
    border-radius: 4px;
    padding: 5px 10px;
    background-color: #eee;
    font-size: 1.2em;
  }
</style>

<script>
  import {
    refresh,
    refreshOne,
    refreshTwo,
    refreshThree,
    suggestionOne,
    suggestionTwo,
    suggestionThree
  } from './users';
</script>

<div class="container">
  <div>
    <button class="refresh" on:click={refresh}>refresh</button>
    <ul>
      {#if $suggestionOne}
        <li>
          <div class="user">
            <img src={$suggestionOne.avatar_url} alt={$suggestionOne.login} />
            <a href={$suggestionOne.html_url}>{$suggestionOne.login}</a>
            <button on:click={() => refreshOne.next()}>x</button>
          </div>
        </li>
      {/if}
      {#if $suggestionTwo}
        <li>
          <div class="user">
            <img src={$suggestionTwo.avatar_url} alt={$suggestionTwo.login} />
            <a href={$suggestionTwo.html_url}>{$suggestionTwo.login}</a>
            <button on:click={() => refreshTwo.next()}>x</button>
          </div>
        </li>
      {/if}
      {#if $suggestionThree}
        <li>
          <div class="user">
            <img src={$suggestionThree.avatar_url} alt={$suggestionThree.login} />
            <a href={$suggestionThree.html_url}>{$suggestionThree.login}</a>
            <button on:click={() => refreshThree.next()}>x</button>
          </div>
        </li>
      {/if}
    </ul>
  </div>
</div>
