<template>
  <v-card class="mb-4">
    <v-card-title class="d-flex align-center border-bottom pb-2">
      <v-icon color="primary" class="mr-2">mdi-account-plus</v-icon>
      Add New Client
      <v-spacer></v-spacer>
      <v-btn icon="mdi-minus" variant="text" size="small" color="grey"></v-btn>
    </v-card-title>
    
    <v-card-text class="pt-4">
      <v-form @submit.prevent="submitForm">
        <v-text-field
          v-model="formData.name"
          label="Name *"
          placeholder="Enter client name"
          variant="outlined"
          density="compact"
          class="mb-2"
          required
        ></v-text-field>
        
        <v-text-field
          v-model="formData.email"
          label="Email *"
          placeholder="Enter email address"
          type="email"
          variant="outlined"
          density="compact"
          class="mb-2"
          required
        ></v-text-field>
        
        <v-text-field
          v-model="formData.phone"
          label="Phone *"
          placeholder="Enter phone number"
          type="tel"
          variant="outlined"
          density="compact"
          class="mb-2"
          required
        ></v-text-field>
        
        <v-text-field
          v-model="formData.company"
          label="Company *"
          placeholder="Enter company name (e.g. ABC (150))"
          variant="outlined"
          density="compact"
          class="mb-2"
          required
        ></v-text-field>
        
        <v-textarea
          v-model="formData.address"
          label="Address"
          placeholder="Enter address"
          variant="outlined"
          density="compact"
          rows="3"
          class="mb-2"
        ></v-textarea>
        
        <v-text-field
          v-model="formData.project_budget"
          label="Project Budget *"
          placeholder="Enter project budget"
          type="number"
          variant="outlined"
          density="compact"
          class="mb-4"
          required
        ></v-text-field>
        
        <div class="d-flex justify-center gap-2">
          <v-btn color="primary" type="submit" prepend-icon="mdi-content-save">
            Save Client
          </v-btn>
          <v-btn color="grey-lighten-2" class="ml-2" @click="resetForm" prepend-icon="mdi-refresh">
            Reset
          </v-btn>
        </div>
      </v-form>
    </v-card-text>
  </v-card>
</template>

<script setup>
import { ref, watch } from 'vue';

const props = defineProps({
  isEditMode: {
    type: Boolean,
    default: false
  },
  client: {
    type: Object,
    default: null
  }
});

const emit = defineEmits(['add-client', 'update-client', 'cancel-edit']);

const formData = ref({
  name: '',
  email: '',
  phone: '',
  company: '',
  address: '',
  project_budget: ''
});

// Watch for edit mode changes
watch(() => props.client, (newVal) => {
  if (newVal) {
    formData.value = { ...newVal };
  } else {
    resetForm();
  }
});

const submitForm = () => {
  if (!formData.value.name || !formData.value.email || !formData.value.phone || !formData.value.company || !formData.value.project_budget) {
    alert("Please fill in all required fields.");
    return;
  }
  
  if (props.isEditMode) {
    emit('update-client', { ...formData.value });
  } else {
    emit('add-client', { ...formData.value });
  }
  resetForm();
};

const resetForm = () => {
  formData.value = {
    name: '',
    email: '',
    phone: '',
    company: '',
    address: '',
    project_budget: ''
  };
  if (props.isEditMode) {
    emit('cancel-edit');
  }
};
</script>

<style scoped>
.border-bottom {
  border-bottom: 1px solid var(--border-color);
}
</style>
