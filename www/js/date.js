var m_names = new Array("Jan", "Feb", "Mar",
                            "Apr", "May", "Jun", "Jul", "Aug", "Sep",
                            "Oct", "Nov", "Dec");

 var d = new Date();
 var curr_date = d.getDate();
 var curr_month = d.getMonth();
 var curr_year = d.getFullYear();
 document.getElementById("date").innerHTML = curr_date + "-" + m_names[curr_month] + "-" + curr_year;