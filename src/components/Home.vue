<template>
    <div>
        <v-container fluid class="blue darken-1">
            <v-row no-gutters>
                <v-col cols="12" sm=12>
                    <h1 class="headline white--text">Latihan Vue dengan laravel</h1>
                </v-col>
            </v-row>
        </v-container>
        <v-container>
            <v-row>
                <v-col cols="12">
                    <v-alert :value="alert" color="green accent-4 white--text" border="left"
                        transition="scale-transition" dismissible>
                        Lorem ipsum dolor sit amet.
                    </v-alert>
                    <v-alert :value="alert2" color="red accent-4 white--text" border="left"
                        transition="scale-transition" dismissible>
                        {{alertMessage}}
                    </v-alert>
                </v-col>
            </v-row>
        </v-container>
        <v-container>
            <v-form ref="form" v-model="valid" lazy-validation>
                <v-row>
                    <v-col cols=6 align="center">
                        <h2 class="green white--text">
                            Mulai
                        </h2>
                        <v-container>
                            <v-row>
                                <v-col cols=12 md=12>
                                    <v-text-field hint="example : -2.991401" :label="latitude" :counter="10"
                                        :rules="inputRules" v-model="value_latitude0" required></v-text-field>

                                    <v-text-field hint="example : 104.763345" :label="longitude" :counter="10"
                                        :rules="inputRules" v-model="value_longitude0" required></v-text-field>
                                </v-col>
                            </v-row>
                        </v-container>
                    </v-col>
                    <v-col cols=6 align="center">
                        <h2 class="red white--text">
                            Sampai
                        </h2>
                        <v-container>
                            <v-row>
                                <v-col cols=12 md=12>
                                    <v-text-field :label="latitude" :counter="10" :rules="inputRules"
                                        v-model="value_latitude1"></v-text-field>

                                    <v-text-field :label="longitude" :counter="10" :rules="inputRules"
                                        v-model="value_longitude1"></v-text-field>
                                </v-col>
                            </v-row>
                        </v-container>
                    </v-col>
                </v-row>
            </v-form>
            <v-row>
                <v-col cols=12 align="center">
                    <v-btn color="blue white--text" :disabled="!valid" @click="hitungAction">Hitung</v-btn>
                    <v-btn color="red white--text ml-2" @click="Clear">Clear</v-btn>
                </v-col>
            </v-row>
        </v-container>
        <v-container>
            <v-row>
                <v-col class="title">
                    List Jarak
                </v-col>
                <v-col cols="12">
                    <v-expansion-panels accordion v-if="listValue.length != 0">
                        <v-expansion-panel v-for="(item,index) in listValue" :key="index">
                            <v-expansion-panel-header class="font-weight-black">
                                {{item.Jarak}} KM
                            </v-expansion-panel-header>
                            <v-expansion-panel-content>
                                <v-simple-table>
                                    <template v-slot:default>
                                        <tbody>
                                            <tr>
                                                <td class="subtitle-1 font-weight-bold">Jarak</td>
                                                <td>{{item.Jarak}}</td>
                                            </tr>
                                            <tr>
                                                <td class="subtitle-1 font-weight-bold">LatitudeStart</td>
                                                <td>{{item.Latitude0}}</td>
                                            </tr>
                                            <tr>
                                                <td class="subtitle-1 font-weight-bold">LongitudeStart</td>
                                                <td>{{item.Longtide0}}</td>
                                            </tr>
                                            <tr>
                                                <td class="subtitle-1 font-weight-bold">LatitudeEnd</td>
                                                <td>{{item.Latitude1}}</td>
                                            </tr>
                                            <tr>
                                                <td class="subtitle-1 font-weight-bold">LongitudeEnd</td>
                                                <td>{{item.Longtide1}}</td>
                                            </tr>
                                            <tr>
                                                <td colspan="2">
                                                    <v-btn fab small color="blue mt-2 ml-2 mr-2 mb-2 white--text"
                                                        @click="edit(index)">
                                                        <v-icon dark>mdi-pencil</v-icon>
                                                    </v-btn>

                                                    <v-btn fab small color="red mt-2 ml-2 mr-2 mb-2 white--text"
                                                        @click="remove(index)">
                                                        <v-icon dark>mdi-delete</v-icon>
                                                    </v-btn>
                                                </td>
                                            </tr>
                                        </tbody>
                                    </template>
                                </v-simple-table>
                            </v-expansion-panel-content>
                        </v-expansion-panel>
                    </v-expansion-panels>
                    <h1 v-else-if="listValue.length == 0" class="text-center">
                        List Kosong
                    </h1>
                </v-col>
            </v-row>
        </v-container>
    </div>
</template>

<script>
import axios from 'axios';
    export default {
        name: "Home",
        data() {
            return {
                valid: true,
                latitude: "latitude",
                longitude: "longitude",

                value_latitude0: 0,
                value_longitude0: 0,

                value_latitude1: 0,
                value_longitude1: 0,

                alert: false,
                alert2: false,
                alertMessage: "xpo",
                listValue : [],
                jarak : 0,

                inputRules: [
                    v => !!v || 'Lantitude is Reuqire',
                    v => (v && v.length > 8 && v.length <= 12) || 'more than 8 and less than 12 characters'
                ]
            }
        },
        mounted(){
            axios.get('distance').then(
                response => (
                    this.pushToList(response.data.data)
                ));
        },
        methods: {
            pushToList(data){
                for (let i = 0; i < data.length; i++) {
                    this.listValue = data
                }
            },
            COLLECT(){
                let co = {
                        'Latitude0': this.value_latitude0,
                        'Longtide0': this.value_longitude0,
                        'Latitude1': this.value_latitude1,
                        'Longtide1': this.value_longitude1,
                        'Jarak': this.jarak,
                    };
                return co;
            },
            hitungAction() {
                if (this.$refs.form.validate()) {
                    console.log(this.COLLECT());
                    axios({
                        method : 'put',
                        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
                        url : 'distance/15',
                        data : JSON.stringify(this.COLLECT())
                    }).then(response=>{
                        console.log(response);
                    });
                }
            },
            Clear() {
                this.$refs.form.reset();
            },
            remove(index) {
                if (index <= this.listValue.length) {
                    axios.delete(`distance/${this.listValue[index].id}`).then(
                        response => {
                            if(response.data == 1){   
                                this.listValue.splice(index, 1);
                                this.alertMessage = "Penghapusan Berhasil"
                                this.alert = true
                                this.alert2 = false;
                            }
                        });
                } else {
                    this.alertMessage = "Terjadi kesalahan pada manusia";
                    this.alert2 = !this.alert2;
                }
            },
            edit(index) {
                if (index <= this.listValue.length) {
                    this.jarak = this.listValue[index].Jarak
                    this.value_latitude1 = this.listValue[index].Latitude1;
                    this.value_longitude1 = this.listValue[index].Longtide1;

                    this.value_latitude0 = this.listValue[index].Latitude0;
                    this.value_longitude0 = this.listValue[index].Longtide0;
                    this.alert2 = false;
                    
                    this.listValue.splice(index,1);
                } else {
                    this.alertMessage = "Terjadi kesalahan pada manusia";
                    this.alert2 = !this.alert2;
                }
            }
        }
    }
</script>

<style>

</style>