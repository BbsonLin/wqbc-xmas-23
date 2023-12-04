<template>
  <div class="flex flex-col items-center mt-36">
    <div class="typer-line text-5xl text-coolGray-4 anim-typewriter">過去的生命中，有哪個負面的聲音一直影響著你？</div>
    <PrimeTextarea class="mt-4 w-2/3 b-coolGray b-3" rows="5"></PrimeTextarea>
  </div>
</template>

<script setup lang="ts">

</script>

<style scoped>
/* Animation */
.typer-line{
    position: relative;
    border-right: 2px solid rgba(255,255,255,.75);
    white-space: nowrap;
    overflow: hidden;   
}

.anim-typewriter{
  animation: typewriter 4s steps(50) 1s 1 normal both,
             blinkTextCursor 500ms steps(50) infinite normal;
}

@keyframes typewriter{
  from{width: 0;}
  to{width: 22em;}
}

@keyframes blinkTextCursor{
  from{border-right-color: rgba(255,255,255,.75);}
  to{border-right-color: transparent;}
}
</style>
