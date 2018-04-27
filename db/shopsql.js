var shopsql = {   
                get_all_shop:'select * from dianping where commentnum>0',
                group_by_type:'select foodtype, count(id) as value from dianping where commentnum>0 group by foodtype'
              };
module.exports = shopsql