<template>
  <v-layout>
    <!-- Navigation Drawer (Sidebar) -->
    <v-navigation-drawer
      v-model="drawer"
      app
      color="#2d3748"
      theme="dark"
      width="250"
    >
      <div class="pa-4" style="background-color: #232b38;">
        <v-row align="center" no-gutters>
          <v-col cols="auto">
            <v-avatar color="grey-lighten-2" size="48">
              <v-icon color="grey-darken-3">mdi-account</v-icon>
            </v-avatar>
          </v-col>
          <v-col class="ml-3">
            <div class="text-subtitle-2 font-weight-bold">Admin User</div>
            <div class="text-caption d-flex align-center text-grey-lighten-1">
              <v-badge dot color="success" inline class="mr-1"></v-badge>
              Online
            </div>
          </v-col>
        </v-row>
      </div>

      <div class="px-4 py-2 text-caption text-grey-lighten-1 text-uppercase font-weight-bold">
        Main Navigation
      </div>

      <v-list nav>
        <v-list-item
          prepend-icon="mdi-home"
          title="Dashboard"
          to="/dashboard"
          active-color="primary"
        ></v-list-item>
        <v-list-item
          prepend-icon="mdi-account-group"
          title="Clients"
          to="/clients"
          active-color="primary"
        ></v-list-item>
        <v-list-item
          prepend-icon="mdi-file-document"
          title="Reports"
          to="/reports"
          active-color="primary"
        ></v-list-item>
        <v-list-item
          prepend-icon="mdi-cog"
          title="Settings"
          to="/settings"
          active-color="primary"
        ></v-list-item>
        <v-list-item
          prepend-icon="mdi-account-multiple"
          title="Users"
          to="/users"
          active-color="primary"
        ></v-list-item>
      </v-list>

      <template v-slot:append>
        <div class="pa-2" style="background-color: #1e293b;">
          <v-list-item
            prepend-icon="mdi-logout"
            title="Logout"
            @click="logout"
          ></v-list-item>
        </div>
      </template>
    </v-navigation-drawer>

    <!-- App Bar (Topbar) -->
    <v-app-bar color="primary" elevation="2">
      <v-app-bar-nav-icon @click="drawer = !drawer"></v-app-bar-nav-icon>
      
      <v-toolbar-title class="text-h6 font-weight-bold ml-2">
        Client Management System
      </v-toolbar-title>

      <v-spacer></v-spacer>

      <v-btn icon>
        <v-badge content="5" color="success">
          <v-icon>mdi-bell</v-icon>
        </v-badge>
      </v-btn>

      <v-menu>
        <template v-slot:activator="{ props }">
          <v-btn v-bind="props" class="text-none">
            <v-avatar size="32" class="mr-2" color="grey-lighten-2">
              <v-icon color="grey-darken-3" size="20">mdi-account</v-icon>
            </v-avatar>
            Admin User
            <v-icon right>mdi-menu-down</v-icon>
          </v-btn>
        </template>
        <v-list>
          <v-list-item title="Profile" prepend-icon="mdi-account-circle"></v-list-item>
          <v-list-item title="Logout" prepend-icon="mdi-logout" @click="logout"></v-list-item>
        </v-list>
      </v-menu>
    </v-app-bar>

    <!-- Main Content -->
    <v-main style="background-color: #f1f5f9;">
      <router-view></router-view>
      
      <!-- Footer inside main to respect layout -->
      <v-footer color="white" border class="d-flex justify-space-between px-6 py-4 mt-auto">
        <div class="text-body-2 text-grey-darken-1">
          Copyright &copy; 2024 <strong class="text-grey-darken-3">Client Management System</strong>. All rights reserved.
        </div>
        <div class="text-body-2 text-grey-darken-1">
          <strong class="text-grey-darken-3">Version</strong> 1.0.0
        </div>
      </v-footer>
    </v-main>
  </v-layout>
</template>

<script>
export default {
  name: 'MainLayout',
  data() {
    return {
      drawer: true
    }
  },
  methods: {
    logout() {
      alert('Logout clicked')
    }
  }
}
</script>

<style scoped>
.v-list-item--active {
  border-left: 4px solid #60a5fa !important;
}
</style>
