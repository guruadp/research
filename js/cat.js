var flag = 0;
let selectedFile;
var scores = [];
let model;
let currInput;
let propName;
let inputs;
let rowObject;
let regNum = [];
let kHeadings;
let doc = new jsPDF({orientation: "p", lineHeight: 1.5});
let output = [];

$(".upload").on("change", function (event) {
    selectedFile = event.target.files[0];
});

$(".profile-button").on("click", function () {
    if(flag == 0) {
        $(".wrapper").fadeOut();
        $(".options").fadeIn();
        flag = 1;
    }
    else {
        $(".wrapper").fadeIn();
        $(".options").fadeOut();
        flag = 0;
    }
});

let nextCount = 0;
let part;
let s2 = [];
let char = 65;
let c = 65;
let j = 0;
let s3 = [];
let kTot = []; //KLevel Total Marks

$(".next").on("click", function() {
    nextCount++;
    if(nextCount == 1) {
        part = $(".part").val();
        part = parseInt(part);
        $(".section1").fadeOut();
        $(".section2").fadeIn();
    }

    if(nextCount <= part+1 && nextCount > 1) {
        if(nextCount < part+1) {
            char += 1;
        }
        $(".q2").text("No. of Part " + String.fromCharCode(char) + " questions");
        s2.push(parseInt($(".s2").val()));
        $(".s2").val('');
    }

    if(nextCount == part+1 || nextCount > part+1) {
        let html = '';
        for(let i = 0; i<s2[j]; i++) {
            html += '<center><button class="qn">' + String.fromCharCode(c) + i +'</button><input type="text" placeholder="K Level" class="klevel"></center><br><br>';
        }
        j++;
        c++;
        $(".section2").fadeOut();
        $(".section3").append(html);
        $(".section3").fadeIn();
    }
    if(nextCount == part+1+s2.length) {
        var inputs = $(".klevel");
        for(var i=0; i<inputs.length; i++) {
            s3.push($(inputs[i]).val());
        }
        $(".section3").fadeOut();
        $(".section4").fadeIn();
    }

    if(nextCount > part+1+s2.length) {
        $(".section3").hide();
    }

    if(nextCount == part+2+s2.length) {
        
            if(selectedFile) {
                let fileReader = new FileReader();
                fileReader.readAsBinaryString(selectedFile);
                fileReader.onload = (event) => {
                    let data = event.target.result;
                    let workbook = XLSX.read(data, {type: "binary"});
                    workbook.SheetNames.forEach(sheet => {
                        rowObject = XLSX.utils.sheet_to_row_object_array(workbook.Sheets[sheet]);
                        let jsonData = JSON.stringify(rowObject,undefined, 4);
                        console.log(rowObject);
                        for(let i=1; i<rowObject.length; i++) {
                            regNum.push(rowObject[i].RegNum);
                            delete rowObject[i].RegNum;
                            delete rowObject[i].State;
                            console.log(rowObject[i]);
                            var kLevels = {};
                            propName = Object.keys(rowObject[i]);
                            for(let j=0; j<s3.length; j++) {
                                if(s3[j] == 1) {
                                    if('k1' in kLevels) {
                                        kLevels.k1 += rowObject[i][propName[j]];
                                    }
                                    else {
                                        kLevels.k1 = rowObject[i][propName[j]];
                                    }
                                }

                                else if(s3[j] == 2) {
                                    if('k2' in kLevels) {
                                        kLevels.k2 += rowObject[i][propName[j]];
                                    }
                                    else {
                                        kLevels.k2 = rowObject[i][propName[j]];
                                    }
                                }

                                else if(s3[j] == 3) {
                                    if('k3' in kLevels) {
                                        kLevels.k3 += rowObject[i][propName[j]];
                                    }
                                    else {
                                        kLevels.k3 = rowObject[i][propName[j]];
                                    }
                                }

                                if(s3[j] == 4) {
                                    if('k4' in kLevels) {
                                        kLevels.k4 += rowObject[i][propName[j]];
                                    }
                                    else {
                                        kLevels.k4 = rowObject[i][propName[j]];
                                    }
                                }
                            }
                            scores.push(kLevels);


                        }

                    });


                    $(".section4").fadeOut();
                    $(".section5").fadeIn();
                            if('k1' in scores[0]) {
                                $(".section5").append(`<center><input type="text" class="ques q5" placeholder="K1 Total"></center>`);
                            }
                            if('k2' in scores[0]) {
                                $(".section5").append(`<center><input type="text" class="ques q6" placeholder="K2 Total"></center>`);
                            }
                            if('k3' in scores[0]) {
                                $(".section5").append(`<center><input type="text" class="ques q7" placeholder="K3 Total"></center>`);
                            }
                            if('k4' in scores[0]) {
                                $(".section5").append(`<center><input type="text" class="ques q8" placeholder="K4 Total"></center>`);
                            }

                            kHeadings = Object.keys(scores[0]);





                           










                    
                }
            }

    }

    if(nextCount == part+3+s2.length) {
        var inputs = $(".ques");
        var nomodel;
        var noofkLevels =  Object.keys(scores[0]);
        for(var i=0; i<inputs.length; i++) {
            kTot.push($(inputs[i]).val());
        }
        let options = {
            task: 'classification',
          };
          model = ml5.neuralNetwork(options);



          if(noofkLevels.length == 1) {
            if('k1' in scores[0]) {
              nomodel = 1;
              const modelDetails = {
                  model: '../Models/Model1/1/model.json',
                  metadata: '../Models/Model1/1/model_meta.json',
                  weights: '../Models/Model1/1/model.weights.bin'
                }
                model.load(modelDetails, modelLoaded);
            }
            else if('k2' in scores[0]) {
              nomodel = 2;
              const modelDetails = {
                  model: '../Models/Model1/2/model.json',
                  metadata: '../Models/Model1/2/model_meta.json',
                  weights: '../Models/Model1/2/model.weights.bin'
                }
                model.load(modelDetails, modelLoaded);
            }
            else if('k3' in scores[0]) {
              nomodel = 3;
              const modelDetails = {
                  model: '../Models/Model1/3/model.json',
                  metadata: '../Models/Model1/3/model_meta.json',
                  weights: '../Models/Model1/3/model.weights.bin'
                }
                model.load(modelDetails, modelLoaded);
            }
            else if('k4' in scores[0]) {
              nomodel = 4;
              const modelDetails = {
                  model: '../Models/Model1/4/model.json',
                  metadata: '../Models/Model1/4/model_meta.json',
                  weights: '../Models/Model1/4/model.weights.bin'
                }
                model.load(modelDetails, modelLoaded);
            }
        }
        else if(noofkLevels.length == 2) {
          if('k1' in scores[0] && 'k2' in scores[0]) {
              nomodel = 5;
              const modelDetails = {
                  model: '../Models/Model2/1/model.json',
                  metadata: '../Models/Model2/1/model_meta.json',
                  weights: '../Models/Model2/1/model.weights.bin'
                }
                model.load(modelDetails, modelLoaded);

          }
          else if('k1' in scores[0] && 'k3' in scores[0]) {
              nomodel = 6;
              const modelDetails = {
                  model: '../Models/Model2/2/model.json',
                  metadata: '../Models/Model2/2/model_meta.json',
                  weights: '../Models/Model2/2/model.weights.bin'
                }
                model.load(modelDetails, modelLoaded);
          }
          else if('k1' in scores[0] && 'k4' in scores[0]) {
              nomodel = 7;
              const modelDetails = {
                  model: '../Models/Model2/3/model.json',
                  metadata: '../Models/Model2/3/model_meta.json',
                  weights: '../Models/Model2/3/model.weights.bin'
                }
                model.load(modelDetails, modelLoaded);
          }
          else if('k2' in scores[0] && 'k3' in scores[0]) {
              nomodel = 8;
              const modelDetails = {
                  model: '../Models/Model2/4/model.json',
                  metadata: '../Models/Model2/4/model_meta.json',
                  weights: '../Models/Model2/4/model.weights.bin'
                }
                model.load(modelDetails, modelLoaded);
          }
          else if('k2' in scores[0] && 'k4' in scores[0]) {
              nomodel = 9;
              const modelDetails = {
                  model: '../Models/Model2/5/model.json',
                  metadata: '../Models/Model2/5/model_meta.json',
                  weights: '../Models/Model2/5/model.weights.bin'
                }
                model.load(modelDetails, modelLoaded);
          }
          else if('k3' in scores[0] && 'k4' in scores[0]) {
              nomodel = 10;
              const modelDetails = {
                  model: '../Models/Model2/6/model.json',
                  metadata: '../Models/Model2/6/model_meta.json',
                  weights: '../Models/Model2/6/model.weights.bin'
                }
                model.load(modelDetails, modelLoaded);
          }
        }
        else if(noofkLevels.length == 3) {
          if('k1' in scores[0] && 'k2' in scores[0] && 'k3' in scores[0]) {
              nomodel = 11;
              const modelDetails = {
                  model: '../Models/Model3/1/model.json',
                  metadata: '../Models/Model3/1/model_meta.json',
                  weights: '../Models/Model3/1/model.weights.bin'
                }
                model.load(modelDetails, modelLoaded);
          }
          else if('k2' in scores[0] && 'k3' in scores[0] && 'k4' in scores[0]) {
              nomodel = 12;
              const modelDetails = {
                  model: '../Models/Model3/2/model.json',
                  metadata: '../Models/Model3/2/model_meta.json',
                  weights: '../Models/Model3/2/model.weights.bin'
                }
                model.load(modelDetails, modelLoaded);
          }
          else if('k1' in scores[0] && 'k3' in scores[0] && 'k4' in scores[0]) {
              nomodel = 13;
              const modelDetails = {
                  model: '../Models/Model3/3/model.json',
                  metadata: '../Models/Model3/3/model_meta.json',
                  weights: '../Models/Model3/3/model.weights.bin'
                }
                model.load(modelDetails, modelLoaded);
          }
          else if('k1' in scores[0] && 'k2' in scores[0] && 'k4' in scores[0]) {
              nomodel = 14;
              const modelDetails = {
                  model: '../Models/Model3/4/model.json',
                  metadata: '../Models/Model3/4/model_meta.json',
                  weights: '../Models/Model3/4/model.weights.bin'
                }
                model.load(modelDetails, modelLoaded);
          }
        }
        else if(noofkLevels.length == 4) {
          nomodel = 15;
          const modelDetails = {
              model: '../Models/Model4/model.json',
              metadata: '../Models/Model4/model_meta.json',
              weights: '../Models/Model4/model.weights.bin'
            }
            model.load(modelDetails, modelLoaded);
        }
          

          function modelLoaded() {
            console.log("Model Loaded");
        }






    }
});

$(document).on('keypress',function(e) {
    if(e.which == 13) {
        for(let i = 0; i < scores.length; i++) {
            var tempCount = 0;
            if('k1' in scores[i]) {
                scores[i].k1 = (scores[i].k1/kTot[tempCount])*100;
                tempCount++;
            }
            if('k2' in scores[i]) {
                scores[i].k2 = (scores[i].k2/kTot[tempCount])*100;
                tempCount++;
            }
            if('k3' in scores[i]) {
                scores[i].k3 = (scores[i].k3/kTot[tempCount])*100;
                tempCount++;
            }
            if('k4' in scores[i]) {
                scores[i].k4 = (scores[i].k4/kTot[tempCount])*100;
                tempCount++;
            }
            console.log(scores[i]);
            inputs = scores[i];
            model.classify(inputs, gotResults);
        }
    }

    else if(e.which == 32) {

                //JS-PDF

                function tableHead() {
                    var html = '<tr>';
                    for (const property in rowObject[1]) {
                        html += '<th>'+property+'</th>'
                      } 

                      html += '</tr><tr>'
                      for (const property in rowObject[1]) {
                        html += '<th>'+rowObject[1][property]+'</th>'
                      }
                      html += '</tr>'
                      return html;
                };

                var heades = [];
                var bodies = [];
                var headInd = [];
                var bodiesInd = [];
                heades.push(headInd);
                bodies.push(bodiesInd);
                for (const property in rowObject[1]) {
                    headInd.push(property);
                  }
                
                for (let i=1; i<rowObject.length; i++) {
                    doc.text(regNum[0], 13, 10);
                    regNum.splice(0, 1);
					
                    for (const property in rowObject[i]) {
                        bodiesInd.push(rowObject[i][property]);
                      }
                      doc.autoTable({
                        head: heades,
                        body: bodies,
                      });

                      doc.text("K Level Scores", 16, 48);
                      //K Levels
                      var w = 68;

                      for(let i=0; i<kHeadings.length; i++) {
                          doc.text(''+kHeadings[i]+'',16,w);
                          w += 20;
                      }

                      w = 68;
                      
                      for(const property in scores[0]) {
                          doc.text(''+ Math.round(scores[i-1][property] * 100)/100 + '',40,w);
                          w += 20;
                      }
                    
                      //Recommendations

                      doc.text("Recommendations", 16, 160);
                      var recommendation;
                      if(output[i-1] == 'a') {
                        recommendation = "The student is probably struggling with the subject's basics. Focus on rudimentary concepts must be emphasized";
                      }
                      else if(output[i-1] == 'b') {
                        recommendation = "The student has a good grasp of basics, but is struggling with understanding those concepts. Practice is required in areas of content description"
                      }
                      else if(output[i-1] == 'c') {
                        recommendation = "The student has a good overall understanding and application skills. He/She is probably struggling with the notion of time management"
                      }
                      else if(output[i-1] == 'd') {
                        recommendation = "The student is struggling with applying his ideas to real world problems, however he/she has a good foundation of all the concepts in the subject"
                      }
                      else if(output[i-1] == 'e') {
                        recommendation = "The student has an adequate understanding of all the foundational concepts. He/She is also good at expressing his/her ideas and can apply the gained knowledge to solve real world issues. It is adviced to keep up this good work"
                      }
                      var splitTitle = doc.splitTextToSize(recommendation, 180);
                      doc.setFontSize(13);
                      doc.text(splitTitle, 16, 190);
						

                      doc.addPage();
                      for (const property in rowObject[i]) {
                        bodiesInd.pop();
                      }
                }
                

                //$("table").append(tableHead());
                doc.save('Student Report.pdf');
                //console.log(rowObject);

    }
});

function gotResults (error, results) {
    if(error) {
      console.log(error);
      return;
    }
    console.log(results[0].label);
    output.push(results[0].label);

  }