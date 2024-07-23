<script setup>

</script>

<template>
  <div class="container-fluid bg-img">
    <div class="row">
      <div class="col-md-6 d-flex flex-column justify-content-center align-items-center hero-section">
        <h2>Event management for People, by people</h2>
        <p>Whatever your interest, from hiking and reading to networking and skill sharing, there are thousands of
          people who share it on Tower. Events are happening every day—log in to join the fun.</p>
      </div>
    </div>
  </div>
  <div class="container catagories">
    <div class="row">
      <div class="col-12">
        <h3 class="m-3">How Tower works</h3>
      </div>
      <div class="col-md-6 p-md-3 p-5">
        <div class="bg-body">
          <div class="row p-3">
            <div class="col-2">
              <i class="mdi mdi-magnify fs-1"></i>
            </div>
            <div class="col-10">
              <h5>Discover events you’re interested in</h5>
              <p>Browse through community hosted events for all the things you love</p>
            </div>
          </div>
        </div>
      </div>
      <div class="col-md-6 p-md-3 p-5">
        <div class="bg-body">
          <div class="row p-3">
            <div class="col-2">
              <i class="mdi mdi-plus fs-1"></i>
            </div>
            <div class="col-10">
              <h5>Start an event to invite your friends</h5>
              <p>Create your own Tower event, and draw from a community of millions</p>
              <a href="">Create an event</a>
            </div>
          </div>
        </div>

      </div>
    </div>
    <div class="row">
      <div class="col-12">
        <h3 class="m-3">Explore top categories</h3>
      </div>
      <div class="col-md-12">
        <div class="d-flex justify-content-between">
          <div class="bg-body p-md-3 p-1 text-center">
            <i class="mdi mdi-all-inclusive"></i>
            <h6>All</h6>
          </div>
          <div class="bg-body p-md-3 text-center">
            <i class="mdi mdi-music"></i>
            <h6>Concerts</h6>
          </div>
          <div class="bg-body p-md-3 text-center">
            <i class="mdi mdi-account-group"></i>
            <h6>Conventions</h6>
          </div>
          <div class="bg-body p-md-3 text-center">
            <i class="mdi mdi-soccer"></i>
            <h6>Sports</h6>
          </div>
          <div class="bg-body p-md-3 text-center">
            <i class="mdi mdi-monitor"></i>
            <h6>Digital</h6>
          </div>
        </div>
      </div>
    </div>
  </div>
  <div class="container">
    <div class="row">
      <div class="col-12">
        <h3>Upcoming events</h3>
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
.home {
  display: grid;
  height: 80vh;
  place-content: center;
  text-align: center;
  user-select: none;

  .home-card {
    width: clamp(500px, 50vw, 100%);

    >img {
      height: 200px;
      max-width: 200px;
      width: 100%;
      object-fit: contain;
      object-position: center;
    }
  }
}

.bg-img {
  background-image: url('https://images.unsplash.com/photo-1517457373958-b7bdd4587205?q=80&w=2069&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D');
  height: 45vh;
  background-position: center;
  background-size: cover;
}

.hero-section {
  height: 45vh;
  text-shadow: 2px 2px 2px black;
}
</style>
