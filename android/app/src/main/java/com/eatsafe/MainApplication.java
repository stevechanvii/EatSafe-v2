package com.eatsafe;

import android.app.Application;

import com.facebook.react.ReactApplication;
import com.hopding.pdflib.PDFLibPackage;
import com.rnfs.RNFSPackage;
import com.horcrux.svg.SvgPackage;
import com.reactnativecommunity.netinfo.NetInfoPackage;
import com.oblador.vectoricons.VectorIconsPackage;
import com.reactnativecommunity.asyncstorage.AsyncStoragePackage;
import com.swmansion.gesturehandler.react.RNGestureHandlerPackage;
import com.facebook.react.ReactNativeHost;
import com.facebook.react.ReactPackage;
import com.facebook.react.shell.MainReactPackage;
import com.facebook.soloader.SoLoader;
import org.reactnative.camera.RNCameraPackage;
import com.chirag.RNMail.*;

import java.util.Arrays;
import java.util.List;

public class MainApplication extends Application implements ReactApplication {

  private final ReactNativeHost mReactNativeHost = new ReactNativeHost(this) {
    @Override
    public boolean getUseDeveloperSupport() {
      return BuildConfig.DEBUG;
    }

    @Override
    protected List<ReactPackage> getPackages() {
      return Arrays.<ReactPackage>asList(
          new MainReactPackage(),
            new PDFLibPackage(),
            new RNFSPackage(),
            new SvgPackage(),
            new RNMail(),
            new NetInfoPackage(),
            new VectorIconsPackage(),
            new AsyncStoragePackage(),
            new RNGestureHandlerPackage(),
            new RNCameraPackage()
      );
    }

    @Override
    protected String getJSMainModuleName() {
      return "index";
    }
  };

  @Override
  public ReactNativeHost getReactNativeHost() {
    return mReactNativeHost;
  }

  @Override
  public void onCreate() {
    super.onCreate();
    SoLoader.init(this, /* native exopackage */ false);
  }
}
