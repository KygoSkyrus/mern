//REVERSE AN INTEGER

#include <iostream>
using namespace std;
#include<math.h>

int main(){

    int N,digit,ans=0,i=0;
    //i should be equal to total numbers in integer - 1,,, like 100s value or 10s value
    cout<<"enter an integer - ";
    cin>>N;

    // to get i
    // int k=N;
    // while(k!=0){
    //      i++;
    //      k/=10;
    // }
    // i-=1;
    //another way
    i= log10(N) ;//to get the i 
cout<<"i- "<<i<<endl;

    while(N!=0){
         digit=N%10;

         ans=(digit * pow(10,i))+ ans;

         N/=10;
         i--;
    }

    cout<<"reverse - "<<ans;

}
