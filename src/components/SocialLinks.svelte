<script>
  import {scale} from 'svelte/transition'
  export let links = [
    {
      title: 'GitHub',
      href: 'https://github.com/threesam',
      svg: {
        code: `<svg
      viewBox="0 0 15 15"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      width="30"
      height="30">
      <path
        d="M9.358 2.145a8.209 8.209 0 00-3.716
        0c-.706-.433-1.245-.632-1.637-.716a2.17 2.17 0 00-.51-.053 1.258 1.258 0
        00-.232.028l-.01.002-.004.002h-.003l.137.481-.137-.48a.5.5 0 00-.32.276
        3.12 3.12 0 00-.159 2.101A3.354 3.354 0 002 5.93c0 1.553.458 2.597 1.239
        3.268.547.47 1.211.72 1.877.863a2.34 2.34 0
        00-.116.958v.598c-.407.085-.689.058-.89-.008-.251-.083-.444-.25-.629-.49a4.798
        4.798 0 01-.27-.402l-.057-.093a9.216 9.216 0
        00-.224-.354c-.19-.281-.472-.633-.928-.753l-.484-.127-.254.968.484.127c.08.02.184.095.355.346a7.2
        7.2 0 01.19.302l.068.11c.094.152.202.32.327.484.253.33.598.663
        1.11.832.35.116.748.144 1.202.074V14.5a.5.5 0 00.5.5h4a.5.5 0
        00.5-.5v-3.563c0-.315-.014-.604-.103-.873.663-.14 1.322-.39
        1.866-.86.78-.676 1.237-1.73 1.237-3.292v-.001a3.354 3.354 0
        00-.768-2.125 3.12 3.12 0 00-.159-2.1.5.5 0
        00-.319-.277l-.137.48c.137-.48.136-.48.135-.48l-.002-.001-.004-.002-.009-.002a.671.671
        0 00-.075-.015 1.261 1.261 0 00-.158-.013 2.172 2.172 0
        00-.51.053c-.391.084-.93.283-1.636.716z"
        fill="currentColor" />
    </svg>`
      }
    },
    {
      title: 'LinkedIn',
      href: 'https://linkedin.com/in/salvatoredangelo3',
      svg: {
        code: `<svg
      viewBox="0 0 15 15"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      width="30"
      height="30">
      <path
        fill-rule="evenodd"
        clip-rule="evenodd"
        d="M0 1.5A1.5 1.5 0 011.5 0h12A1.5 1.5 0 0115 1.5v12a1.5 1.5 0 01-1.5
        1.5h-12A1.5 1.5 0 010 13.5v-12zM5 5H4V4h1v1zm-1 6V6h1v5H4zm4.5-4A1.5 1.5
        0 007 8.5V11H6V6h1v.5a2.5 2.5 0 014 2V11h-1V8.5A1.5 1.5 0 008.5 7z"
        fill="currentColor" />
    </svg>`
      }
    },
    {
      title: 'Instagram',
      href: 'https://instagram.com/__threesam',
      svg: {
        code: `<svg
      viewBox="0 0 15 15"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      width="30"
      height="30">
      <path d="M7.5 5a2.5 2.5 0 100 5 2.5 2.5 0 000-5z" fill="currentColor" />
      <path
        fill-rule="evenodd"
        clip-rule="evenodd"
        d="M4.5 0A4.5 4.5 0 000 4.5v6A4.5 4.5 0 004.5 15h6a4.5 4.5 0
        004.5-4.5v-6A4.5 4.5 0 0010.5 0h-6zM4 7.5a3.5 3.5 0 117 0 3.5 3.5 0 01-7
        0zM11 4h1V3h-1v1z"
        fill="currentColor" />
    </svg>`
      }
    },
    {
      title: 'Cell',
      href: 'tel:609-356-4012',
      svg: {
        code: `<svg
        viewBox="0 0 15 15"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        width="30"
        height="30">
        <path
          d="M2.5 0A2.5 2.5 0 000 2.5v2C0 10.299 4.701 15 10.5 15h2a2.5 2.5 0
          002.5-2.5v-1.382a1.5 1.5 0 00-.83-1.342l-2.415-1.208a1.5 1.5 0
          00-2.094.868l-.298.893a.71.71 0 01-.812.471A5.547 5.547 0 014.2
          6.45a.71.71 0 01.471-.812l1.109-.37a1.5 1.5 0
          00.98-1.787l-.586-2.344A1.5 1.5 0 004.72 0H2.5z"
          fill="currentColor" />
      </svg>`
      }
    },
  ]
</script>

<style>
  div {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 0.5rem;
  }

  a {
    color: var(--textColor);
    transition: all 0.3s;
  }

  a:hover {
    /* color: var(--primary); */
    transform: scale(1.2);
  }
</style>

<div>
  {#each links as {href, title, svg}, i}
    <a in:scale={{delay: ((i + 1) * 100) + 500, start: 0}} {href} aria-label={title}>{@html svg.code}</a>
  {/each}
</div>