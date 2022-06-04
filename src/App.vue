<template>
  <div class="container">
    <div class="row mb-4">
      <div class="col-auto">
        <div class="d-flex flex-column align-items-start">
        <h5 class="text-left">Пол</h5>
        <SelectButton @change="chaneFloor" v-model="selectedFloor" :options="floors" optionLabel="name" optionValue="id" />
        </div>
      </div>
      <div class="col-auto" v-if="selectedFloor">
        <div class="d-flex flex-column align-items-start">
          <h5 class="text-left">Лазер</h5>
          <SelectButton @change="chaneLaser" v-model="selectedlaser" :options="lasers" optionLabel="name" optionValue="id" />
        </div>
      </div>
    </div>
    <div class="row mb-4" v-if="selectedFloor && selectedlaser">
      <div class="d-flex flex-column align-items-start">
        <h5 class="text-left">Выберите зону  <Button icon="pi pi-plus" @click="displayAddZone = true" class="p-button-rounded p-button-text" /></h5>
        <SelectButton @change="chaneZone" v-model="selectedZone" :options="zones" optionLabel="name" optionValue="id" />
      </div>
    </div>
    <div class="row mb-4" v-if="selectedZone">
      <div class="d-flex flex-column align-items-start">
        <h5 class="text-left">Услуги  <Button icon="pi pi-plus" @click="displayAddService = true" class="p-button-rounded p-button-text" /></h5>
        <div class="p-fluid">
          <div class="card">
            <DataTable :value="products1" editMode="cell" @cell-edit-complete="onCellEditComplete" class="editable-cells-table" responsiveLayout="scroll">
              <Column v-for="col of columns" :field="col.field" :header="col.header" :key="col.field" style="width:25%">
                <template #editor="{ data, field }">
                  <InputText v-model="data[field]" autofocus />
                </template>
              </Column>
            </DataTable>
          </div>
        </div>
      </div>
    </div>
  </div>
  <Dialog v-model:visible="displayAddZone"  :modal="true">
    <template #header>
      <h5>Добавление зоны </h5>
    </template>
    <div class="pt-2">
       <InputText v-model="addNameZone" type="text" class="p-inputtext-sm" placeholder="Название" />
    </div>
    <template #footer>
      <Button label="Отмена" icon="pi pi-times" class="p-button-text p-button-sm" @click="displayAddZone = false"/>
      <Button class="p-button-sm" label="Добавить" icon="pi pi-check" autofocus @click="addZone" />
    </template>
  </Dialog>
  <Dialog v-model:visible="displayAddService"  :modal="true">
    <template #header>
      <h5>Добавление услуги </h5>
    </template>
    <div class="pt-2">
      <InputText v-model="addNameServise" type="text" class="p-inputtext-sm" placeholder="Название" />
    </div>
    <div class="pt-2">
      <InputText v-model="addPriceServise" type="text" class="p-inputtext-sm" placeholder="Цена" />
    </div>

    <template #footer>
      <Button label="Отмена" icon="pi pi-times" class="p-button-text p-button-sm" @click="displayAddService = false"/>
      <Button class="p-button-sm" label="Добавить" icon="pi pi-check" autofocus @click="addService" />
    </template>
  </Dialog>
  <Toast/>
</template>

<script>
import axios from "axios";
import SelectButton from 'primevue/selectbutton';
import Button from 'primevue/button';
import Dialog from 'primevue/dialog';
import InputText from 'primevue/inputtext';
import Toast from 'primevue/toast';
import DataTable from 'primevue/datatable';
import Column from 'primevue/column';


export default {
  name: 'App',
  components: {
    SelectButton,
    Button,
    Dialog,
    InputText,
    Toast,
    DataTable,
    Column,

  },
  data(){

    return {
      //добавление зоны
      displayAddZone: false,
      addNameZone: null,
      displayAddService: null,
      addNameServise:null,
      addPriceServise:null,
      columns: null,

      //выбранные
      selectedFloor: null,
      floors:null,
      selectedlaser: null,
      lasers:null,
      choose_zone: null,
      zones:null,
      selectedZone:null,
      products1:null
    }
  },

  methods: {

    init(){
      axios.get( 'https://script.kdm1.ru/epiliumclinic/admin/api/?what=floor'
      ).then((resp)=>{
        this.floors =resp.data.floor;
        this.lasers =resp.data.laser;
        console.log(resp.data);
      }).catch(function(error){
        console.log(error);
      });
    },
    chaneFloor(){
      this.selectedlaser = null
      this.selectedZone= null;
      /*if(this.selectedlaser !== null){
        axios.get( 'https://script.kdm1.ru/epiliumclinic/admin/api/?what=laser&floor='+this.selectedFloor+'&laser='+this.selectedlaser
        ).then((resp)=>{
          console.log(resp.data);
        }).catch(function(error){
          console.log(error);
        });
      }*/

    },
    chaneLaser(){
      axios.get( 'https://script.kdm1.ru/epiliumclinic/admin/api/?what=choose_zone&floor='+this.selectedFloor+'&laser='+this.selectedlaser
      ).then((resp)=>{
        this.zones = resp.data;
        //console.log(resp.data);
        this.selectedZone= null;
      }).catch(function(error){
        console.log(error);
      });
    },
    chaneZone(){

      axios.get( 'https://script.kdm1.ru/epiliumclinic/admin/api/?what=servise&zone='+this.selectedZone
      ).then((resp)=>{
        this.products1 = resp.data;
        console.log(resp.data);
      }).catch(function(error){
        console.log(error);
      });
    },

    onCellEditComplete(event) {
      let { data, newValue, field } = event;

      switch (field) {
        case 'quantity':
        case 'price':
          if (this.isPositiveInteger(newValue))
            data[field] = newValue;
          else
            event.preventDefault();
          break;

        default:
          if (newValue.trim().length > 0)
            data[field] = newValue;
          else
            event.preventDefault();
          break;
      }

      data.what = 'updade_service';
      axios.post( 'https://script.kdm1.ru/epiliumclinic/admin/api/',
          data,
           {}
       ).then((resp)=> {
         if (resp.data === 'Y') {
            console.log(resp.data)
         }
       });

    },
    isPositiveInteger(val) {
      let str = String(val);
      str = str.trim();
      if (!str) {
        return false;
      }
      str = str.replace(/^0+/, "") || "0";
      var n = Math.floor(Number(str));
      return n !== Infinity && String(n) === str && n >= 0;
    },
    addZone(){
      if(this.addNameZone !== null && this.addNameZone !== ""){
        let data = {
          what: 'add_zone',
          floor:this.selectedFloor,
          laser:this.selectedlaser,
          name:this.addNameZone,
        }
        axios.post( 'https://script.kdm1.ru/epiliumclinic/admin/api/',
            data,
            {}
        ).then((resp)=>{
          if(resp.data === 'Y'){
            this.$toast.add({severity:'success', summary: 'Зона успешно добавлена', life: 3000});
            this.chaneLaser();
            this.addNameZone = null;

          }
          console.log(resp.data);
        }).catch(function(error){
          console.log(error);
        });

        console.log(this.addNameZone);
      } else {
        alert('Введите название');
      }
    },
    addService(){
      if(this.selectedZone !== null && this.selectedZone !== ""){
        let data = {
          what: 'add_servise',
          zone:this.selectedZone,
          name:this.addNameServise,
          price:this.addPriceServise,
        }
        axios.post( 'https://script.kdm1.ru/epiliumclinic/admin/api/',
            data,
            {}
        ).then((resp)=>{
          if(resp.data === 'Y'){
            this.$toast.add({severity:'success', summary: 'Зона успешно добавлена', life: 3000});
            this.chaneZone();
            this.addNameServise =null;
            this.addPriceServise =null;
          }
          console.log(resp.data);
        }).catch(function(error){
          console.log(error);
        });

        console.log(this.addNameZone);
      } else {
        alert('Введите название');
      }
    }

  },
  created() {
    this.columns= [
      {field: 'name', header: 'Название'},
      {field: 'price', header: 'Цена'},
      {field: 'sort', header: 'Сортировка'}
    ];
    //console.log();
    this.init();
  },
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
