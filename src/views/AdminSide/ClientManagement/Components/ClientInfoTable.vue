<template>
  <div>
    <!-- Search Bar -->
    <v-card class="mb-4">
      <v-card-title class="d-flex align-center border-bottom pb-2">
        <v-icon color="primary" class="mr-2">mdi-magnify</v-icon>
        Search Client by Phone
        <v-spacer></v-spacer>
        <v-btn icon="mdi-minus" variant="text" size="small" color="grey"></v-btn>
      </v-card-title>
      <v-card-text class="pt-4 d-flex align-center">
        <v-text-field
          v-model="searchQuery"
          placeholder="Enter phone number..."
          variant="outlined"
          density="compact"
          hide-details
          class="mr-4"
          @keyup.enter="handleSearch"
        ></v-text-field>
        <v-btn color="primary" prepend-icon="mdi-magnify" @click="handleSearch">
          Search
        </v-btn>
      </v-card-text>
    </v-card>

    <!-- Data Table -->
    <v-card>
      <v-card-title class="d-flex align-center border-bottom pb-2">
        <v-icon color="primary" class="mr-2">mdi-format-list-bulleted</v-icon>
        Client List
        <v-spacer></v-spacer>
        <v-btn icon="mdi-minus" variant="text" size="small" color="grey"></v-btn>
      </v-card-title>
      
      <v-data-table
        :headers="headers"
        :items="clients"
        :search="searchQuery"
        class="elevation-0"
      >
        <template v-slot:item.project_budget="{ item }">
          <div class="text-right">{{ formatCurrency(item.project_budget) }}</div>
        </template>
        <template v-slot:item.service_charge="{ item }">
          <div class="text-right">{{ formatCurrency(item.service_charge) }}</div>
        </template>
        <template v-slot:item.discount="{ item }">
          <div class="text-right">{{ formatCurrency(item.discount) }}</div>
        </template>
        <template v-slot:item.final_project_value="{ item }">
          <div class="text-right font-weight-bold">{{ formatCurrency(item.final_project_value) }}</div>
        </template>
        <template v-slot:item.actions="{ item }">
          <div class="d-flex justify-center">
            <v-btn
              icon="mdi-pencil"
              size="small"
              color="primary"
              variant="flat"
              class="mr-2"
              @click="$emit('edit-client', item)"
            ></v-btn>
            <v-btn
              icon="mdi-delete"
              size="small"
              color="error"
              variant="flat"
              @click="$emit('delete-client', item.client_id)"
            ></v-btn>
          </div>
        </template>
      </v-data-table>
    </v-card>
  </div>
</template>

<script setup>
import { ref } from 'vue';

const props = defineProps({
  clients: {
    type: Array,
    required: true
  }
});

const emit = defineEmits(['delete-client', 'edit-client', 'search']);

const searchQuery = ref('');

const headers = [
  { title: '#', key: 'client_id' },
  { title: 'Name', key: 'name' },
  { title: 'Email', key: 'email' },
  { title: 'Phone', key: 'phone' },
  { title: 'Company', key: 'company' },
  { title: 'Project Budget (Rs.)', key: 'project_budget', align: 'end' },
  { title: 'Service Charge (Rs.)', key: 'service_charge', align: 'end' },
  { title: 'Discount (Rs.)', key: 'discount', align: 'end' },
  { title: 'Final Project Value (Rs.)', key: 'final_project_value', align: 'end' },
  { title: 'Actions', key: 'actions', align: 'center', sortable: false }
];

const handleSearch = () => {
  emit('search', searchQuery.value);
};

const formatCurrency = (value) => {
  if (value === undefined || value === null) return '-';
  return new Intl.NumberFormat('en-LK').format(value);
};
</script>

<style scoped>
.border-bottom {
  border-bottom: 1px solid var(--border-color);
}
</style>
