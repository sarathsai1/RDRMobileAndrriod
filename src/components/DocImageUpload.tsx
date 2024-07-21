import React, { useState } from 'react';
import { ActivityIndicator, Image, Platform, StyleSheet, Text, TouchableOpacity, View, ViewProps, ViewStyle } from 'react-native';
import { Icon } from 'react-native-elements/dist/icons/Icon';
import ImagePicker, { Image as PickerImage } from 'react-native-image-crop-picker';
import ImageZoomViewer from 'react-native-image-zoom-viewer';
import UniversalFormModal from './UniversalFormModal';
import DocumentPicker from 'react-native-document-picker';
import { checkCameraUsage, checkPermission, showErrorToast, renderModalCloseButton, getSafeAreaInsets, } from '../utils/permissions';
import Modal from 'react-native-modal';

type DocImageUploadProps = ViewProps & {
  onImagePicked?(uri: any, data?: any, metadata?: any): void;
  onImageUploading?(): void;
  onImageUploaded?(url: string, data?: any, metadata?: any): void;
  onImageUploadError?(): void;
  width?: number;
  height?: number;
  data?: any;
  upload?: boolean;
  style?: ViewStyle;
  disabled?: boolean;
  indicatorSize?: number | 'small' | 'large';
  crop?: boolean;
  singleSelect?: boolean;
  imageUrl?: string;
  hideViewIcon?: boolean;
  validWidth?: number;
  validHeight?: number;
  fileType: 'allFiles' | 'images' | 'pdf' | 'audio' | 'plainText';
  
};


const DocImageUpload: React.FC<DocImageUploadProps> = props => {
  const localIndicatorSize = props.indicatorSize ?? 'small';
  const { fileType } = props;
  const [showModal, setShowModal] = useState<boolean>(false);
  const [imageModal, setImageModal] = React.useState(false);
  const [uploading, setUploading] = useState<boolean>(false);
  const [uploadedUrl, setUploadedUrl] = useState<string>(props.imageUrl!);


  const uploadImage = (result: PickerImage) => {
    const { width, height, path, data } = result;
    if (
      (props?.validWidth && width < props?.validWidth) ||
      (props?.validHeight && height < props?.validHeight)
    ) {
      props?.onImageUploadError && props?.onImageUploadError();
      return;
    }
    props.onImagePicked &&
      props.onImagePicked(path, props.data, {
        height: height,
        width: width,
      });

    // if (props.upload) {
    //   props.onImageUploading && props.onImageUploading();
    //   setUploading(true);
    //     AssetService.uploadImage(data).then(
    //       (url: string) => {
    //         console.log('Uploaded image => ', url);
    //         setUploading(false);
    //         setUploadedUrl(url);
    //         props.onImageUploaded &&
    //           props.onImageUploaded(url, props.data, {
    //             height: height,
    //             width: width,
    //           });
    //       },
    //       (error: any) => showErrorToast({text: i18n.t('error.uploadImage')}),
    //     );
    // } else {
    //   props.onImageUploaded &&
    //     props.onImageUploaded(path, props.data, {
    //       height: height,
    //       width: width,
    //     });
    // }
  };

  const showPickerModal = () => {
    if (!props.disabled && !props.singleSelect) {
      setShowModal(true);
    }
  };

  const hidePickerModal = () => {
    setShowModal(false);
  };


  const performAction = async (camera = false) => {
    hidePickerModal();
    let permissionAction = camera
      ? requestCameraPermission
      : requestExternalWritePermission;
    let action = camera ? ImagePicker.openCamera : ImagePicker.openPicker;

    let permissionResult = await permissionAction();

    if (permissionResult) {
      setTimeout(async () => {
        let result = await action({
          width: props.width,
          height: props.height,
          cropping:
            props.crop ??
            (props.width !== undefined && props.height !== undefined),
          //includeBase64: true,
          mediaType: 'photo',
          compressImageMaxWidth: 1024,
          compressImageMaxHeight: 1280,
          compressImageQuality: 0.8,
        });

        if (result) {
          uploadImage(result);
        }
      }, 600);
    }
  };

  const requestCameraPermission = async () => {
    return await checkCameraUsage('permissions.enableCamera');
  };

  const requestExternalWritePermission = async () => {
    return await checkPermission(
      'PHOTO_LIBRARY',
      'permissions.enablePhotoLibrary'
    );
  };

  const pickImageFromCamera = () => {
    performAction(true);
  };

  const openImagePickerAsync = async () => {
    //performAction();


    try {
      const res = await DocumentPicker.pick({
        allowMultiSelection: false,
        // Provide which type of file you want user to pick
        type: fileType ? [DocumentPicker.types[fileType]] : DocumentPicker.types.allFiles,
        // There can me more options as well
        // DocumentPicker.types.allFiles
        // DocumentPicker.types.images
        // DocumentPicker.types.plainText
        // DocumentPicker.types.audio
        // DocumentPicker.types.pdf
      });
      // Printing the log realted to the file
      console.log('res : ' + JSON.stringify(res));
      props.onImagePicked &&
        props.onImagePicked(res, props.data);
      setShowModal(false);
      // Setting the state to show single file attributes
      // setSingleFile(res);
    } catch (err) {
      // Handling any exception (If any)
      if (DocumentPicker.isCancel(err)) {
        // If user canceled the document selection
        // alert('Canceled');
      } else {
        // For Unknown Error
        showErrorToast({ text: 'Unknown Error: ' + JSON.stringify(err) });
        throw err;
      }
    }
  };

  const hideImageModal = () => {
    setImageModal(false);
  };

  const showImageModal = () => {
    setImageModal(true);
  };


  function alert(arg0: string): void {
    throw new Error('Function not implemented.');
  }

  return (
    <>
      <TouchableOpacity
        activeOpacity={0.9}
        onPress={showPickerModal}
        style={props.style}>
        {props.children}
        {props.disabled && <View style={[props.style, styles.disabled]} />}
        {uploading && (
          <View
            style={{
              position: 'absolute',
              top: 0,
              width: '100%',
              height: '100%',
              justifyContent: "center",
              alignItems: "center"
            }}>
            <ActivityIndicator
              size={localIndicatorSize}
              color={'yellow'}
              style={{ width: 40, backgroundColor: 'transparent' }}
            />
          </View>
        )}
        {!!uploadedUrl && !props?.hideViewIcon && (
          <View style={styles.controls}>
            <Icon
              name={'eye-outline'}
              type={'ionicon'}
              size={26}
              color={'yellow'}
              style={{}}
              onPress={showImageModal}
            />
          </View>
        )}
      </TouchableOpacity>

      <Modal
        isVisible={showModal}
        backdropColor={'#000000'}
        backdropOpacity={0.4}
        animationInTiming={500}
        animationOutTiming={200}
        backdropTransitionInTiming={1000}
        backdropTransitionOutTiming={300}
        useNativeDriver={false}
        onBackdropPress={hidePickerModal}
        onBackButtonPress={hidePickerModal}
        style={[styles.pickerModal]}
        onModalWillHide={() => {
          console.log('Modal hiding');
        }}
        animationIn="fadeInUp"
        animationOut="fadeOutDown">
        <View style={{ width: '100%', height: '24%', backgroundColor: 'white', paddingTop: 50 }}>
          {renderModalCloseButton({}, hidePickerModal)}
          <View style={{width: '100%', height: '100%', paddingVertical: 30, flexDirection: 'row', justifyContent: 'center', alignContent: 'center' }}>
            <TouchableOpacity
              activeOpacity={0.9}
              onPress={pickImageFromCamera}>
             <View style={{ width: 180, height: '100%', alignItems: 'center', justifyContent: 'center', }}>
                <Image
                  source={require('../assets/icons/camera_icon.png')}
                />
                <Text style={{ fontWeight: '800' }}>Camera</Text>
              </View>
            </TouchableOpacity>

            <TouchableOpacity
              activeOpacity={0.9}
              onPress={openImagePickerAsync}>
              <View style={{ width: 180, height: '100%', alignItems: 'center', justifyContent: 'center', }}>
                <Image
                  source={require('../assets/icons/gallery_icon.png')}
                />
                <Text style={{ fontWeight: '800' }}>Gallery</Text>
              </View>
            </TouchableOpacity>
          </View>
          {/* <TouchableOpacity
            activeOpacity={0.9}
            style={styles.btn}
            onPress={pickImageFromCamera}>
            <Text style={[styles.title]}>takePicture</Text>
          </TouchableOpacity>

          <TouchableOpacity
            activeOpacity={0.9}
            style={styles.btn}
            onPress={openImagePickerAsync}>
            <Text style={[styles.title]}>pickFromGallery</Text>
          </TouchableOpacity> */}
        </View>
      </Modal>

      {imageModal && (
        <Modal
          isVisible={imageModal}
          backdropColor={'#000000'}
          backdropOpacity={0.8}
          animationInTiming={500}
          animationOutTiming={200}
          backdropTransitionInTiming={1000}
          backdropTransitionOutTiming={300}
          useNativeDriver={false}
          onBackdropPress={hideImageModal}
          onBackButtonPress={hideImageModal}
          style={[styles.pickerModal]}
          animationIn="fadeInUp"
          animationOut="fadeOutDown">
          <ImageZoomViewer
            imageUrls={[
              {
                url: uploadedUrl!,
              },
            ]}
            index={0}
            style={{ flex: 1 }}
            renderIndicator={() => <></>}
            onSaveToCamera={() => alert('saved')}
            saveToLocalByLongPress={true}
          />

          <View
            style={styles.closeButton}>
            {renderModalCloseButton(
              {
                position: 'relative',
                top: getSafeAreaInsets().top,
                marginLeft: 10,
              },
              hideImageModal,
            )}
          </View>
        </Modal>
      )}
    </>
  )
}

export default React.memo(DocImageUpload);


const styles = StyleSheet.create({
  pickerModal: {
    zIndex: 1000,
    flex: 1,
    justifyContent: 'flex-end',
    margin: 0,
    marginVertical: Platform.OS == 'ios' ? 25 : 0,
  },
  btn: {
    justifyContent: "center",
    alignItems: "center",
    width: 200,
    height: 35,
    marginVertical: 15,
    padding: 5,
    borderWidth: 1,
    borderRadius: 20,
    borderColor: '#2A9032',
  },
  title: {
    color: '#2A9032',
    fontFamily: "Poppins-SemiBold",
    letterSpacing: 0.1,
    fontSize: 14,
    lineHeight: 22,
  },
  disabled: {
    height: '100%',
    width: '100%',
    backgroundColor: '#38374E',
    opacity: 0.7,
    position: 'absolute',
    top: 0,
  },
  controls: {
    width: '100%',
    position: 'absolute',
    top: 0,
    backgroundColor: '#222328' + 'aa',
  },
  closeButton: {
    position: 'absolute',
    top: 0,
    flexDirection: 'row',
    alignItems: 'center',
    width: '100%',
    justifyContent: 'flex-end',
    paddingVertical: 10,
  }
});