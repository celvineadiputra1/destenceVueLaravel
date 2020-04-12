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
                        transition="scale-transition" type="success" dismissible>
                        Lorem ipsum dolor sit amet.
                    </v-alert>
                    <v-alert :value="alert2" color="red accent-4 white--text" border="left"
                        transition="scale-transition" type="danger" dismissible>
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
                                        :rules="inputRules" v-model="value_latitudeStart" required></v-text-field>

                                    <v-text-field hint="example : 104.763345" :label="longitude" :counter="10"
                                        :rules="inputRules" v-model="value_longitudeStart" required></v-text-field>
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
                                        v-model="value_latitudeEnd"></v-text-field>

                                    <v-text-field :label="longitude" :counter="10" :rules="inputRules"
                                        v-model="value_longitudeEnd"></v-text-field>
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
                                {{item.Jarak}}
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
                                                <td>{{item.LatitudeStart}}</td>
                                            </tr>
                                            <tr>
                                                <td class="subtitle-1 font-weight-bold">LongitudeStart</td>
                                                <td>{{item.LongitudeStart}}</td>
                                            </tr>
                                            <tr>
                                                <td class="subtitle-1 font-weight-bold">LatitudeEnd</td>
                                                <td>{{item.LatitudeEnd}}</td>
                                            </tr>
                                            <tr>
                                                <td class="subtitle-1 font-weight-bold">LongitudeEnd</td>
                                                <td>{{item.LongitudeEnd}}</td>
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
    export default {
        name: "Home",
        data() {
            return {
                valid: true,
                latitude: "latitude",
                longitude: "longitude",

                value_latitudeStart: 0,
                value_longitudeStart: 0,

                value_latitudeEnd: 0,
                value_longitudeEnd: 0,

                alert: false,
                alert2: false,
                alertMessage: "xpo",

                listValue: [{
                        'Jarak': "40 Km",
                        'LatitudeStart': "-2.991401",
                        'LongitudeStart': "-2.991401",
                        'LatitudeEnd': "-2.991401",
                        'LongitudeEnd': "-2.991401",
                    },
                    {
                        'Jarak': "41 Km",
                        'LatitudeStart': "-2.1991401",
                        'LongitudeStart': "-2.991401",
                        'LatitudeEnd': "-2.991401",
                        'LongitudeEnd': "-2.991401",
                    }
                ],

                inputRules: [
                    v => !!v || 'Lantitude is Reuqire',
                    v => (v && v.length > 8 && v.length <= 12) || 'more than 8 and less than 12 characters'
                ]
            }
        },
        methods: {
            hitungAction() {
                if (this.$refs.form.validate()) {
                    this.alert = !this.alert;
                    this.listValue.push({
                        'Jarak': "0 Km",
                        'LatitudeStart': this.value_latitudeStart,
                        'LongitudeStart': this.value_longitudeStart,
                        'LatitudeEnd': this.value_latitudeEnd,
                        'LongitudeEnd': this.value_longitudeEnd
                    });
                }
            },
            Clear() {
                this.$refs.form.reset();
            },
            remove(index) {
                if (index <= this.listValue.length) {
                    this.listValue.splice(index, 1);
                    this.alert2 = false;
                } else {
                    this.alertMessage = "Terjadi kesalahan pada manusia";
                    this.alert2 = !this.alert2;
                }
            },
            edit(index) {
                if (index <= this.listValue.length) {
                    this.value_latitudeStart = this.listValue[index].LatitudeStart;
                    this.value_longitudeStart = this.listValue[index].LongitudeStart;

                    this.value_latitudeEnd = this.listValue[index].LatitudeEnd;
                    this.value_longitudeEnd = this.listValue[index].LongitudeEnd;
                    this.alert2 = false;
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